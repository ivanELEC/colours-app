import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"
import { gridData } from "../../js/utils/grid"
import {Grid, TextField}  from "@material-ui/core"
import ColourCard from "../common/ColourCard"
import { getAllocatedColours, getSimilarColours, colourGradientColumn } from "../../js/utils/colourMatch"
import ColourGrid from "../common/ColourGrid"
const hexyjs = require("hexyjs")


export default function ColourMatch(){
	//state hooks
	const [colour, setColour] = useState(false)
	const [mixData, setMixData] = useState(false)
	const [colourList, setColourList] = useState([])
	const [similarColours, setSimilarColours] = useState([])
	const [maxDiff, setMaxDiff] = useState(50)
	const [grid, setGrid] = useState(null)

	const colourPalette = ["#E42406", "#EC6E08", "#EC9508", "#ECF701", "#2DC84D", "#14C7D1", "#147BD1", "#443BBD", "#753BBD", "#BD3B89"]
 
	
	//effects 
	useEffect(() => {
		//generate grid
		let grid = gridData()
		for(let i = 0; i < colourPalette.length; i++){
			grid = colourGradientColumn(grid, i, colourPalette[i])
		}
		setGrid(grid)
		console.log(grid)
		
		//get mix data from public folder
		fetch("/data/mixData.json")
			.then((res) => res.json())
			.then((data) => setMixData(data))
			.catch((err) => {
				console.log("Failed to fetch mix data", err)
				throw new Error(err)
			})
	}, [])

	useEffect(() => { //flatten mixData to list of allocated colours
		if(mixData){
			let colours = getAllocatedColours(mixData)
			setColourList(colours)
		}
	}, [mixData])

	useEffect(() => { //retrieve list of similar colours 
		let validHex = hexyjs.isHex(`${colour}`)
		if(colourList.length > 0 && validHex && colour.length == 6 && mixData.data){
			let sortedColours = getSimilarColours(colourList, colour, parseFloat(maxDiff), 10, mixData)
			console.log(sortedColours)
			setSimilarColours(sortedColours)
		}
	}, [colourList, colour, maxDiff, mixData])


	//functions 
	const handleChangeColour = (event) => {///saves colour hex to hook value depending on colourNo
		var inputElement = event.target
		var elementId = inputElement.id
		if(inputElement){
			if(elementId == "colour-match-input"){
				setColour(inputElement.value)
			}
		}
	}

	const handleChangeDiff = (event) => {///saves colour diff value to hook value depending on colourNo
		var inputElement = event.target
		var elementId = inputElement.id
		if(inputElement){
			if(elementId == "colour-match-diff"){
				setMaxDiff(parseFloat(inputElement.value))
			}
		}
	}

	//styles
	const useStyles = makeStyles({
		root: {
			padding: 25
		},
		colourPaper: {
			minHeight: 40,
			textAlign: "center",
		}
	})

	const classes = useStyles()

	return (
		<div className={classes.root}>
			<Grid 
				container 
				item
				direction="row"
				justifyContent="center"
			>
				<Grid
					container 
					item
					direction="column"
					justifyContent="flex-start"
					xs={12}
					spacing={4}
				>
					<Grid item>
						<TextField 
							id="colour-match-input" 
							label="Colour to match" 
							variant="standard" 
							onChange={handleChangeColour} 
						/>
						<TextField 
							id="colour-match-diff" 
							label="Max difference" 
							variant="standard" 
							type="number" 
							onChange={handleChangeDiff} 
							defaultValue={maxDiff} 
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						{grid?(
							<ColourGrid grid={grid}/>
						):(
							<div></div>
						)}
					</Grid>
				</Grid>
				<Grid
					container 
					item
					direction="column"
					justifyContent="center"
					xs={12}
					sm={6}
				>
					<Grid
						container
						citem
						direction="row"
						justifyContent="center"
						alignItems="center"
						spacing={4}
					>
						{similarColours.map((colour) => (
							
							<Grid key={colour.colour} item xs={12} md={6}>
								<Link
									to={{ pathname: `/Mix/${colour.mixData.id}` }}
									style={{ textDecoration: "none" }}
								>
									<ColourCard
										colourName={`${colour.mixData.colourName}`}
										artistName={`${colour.mixData.artist}`}
										colourHex={`${colour.mixData.colourHex}`}
										date={`#${colour.mixData.date}`}
										mini={true}
									/>
								</Link>
							</Grid>
						))}	
					</Grid>	
				</Grid>
			</Grid>
		</div>
	)
}