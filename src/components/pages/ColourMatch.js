import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {Grid, TextField, Typography, Paper}  from "@material-ui/core"
import ColourCard from "../common/ColourCard"
import { getAllocatedColours, getSimilarColours } from "../../js/utils/colourMatch"
import PropTypes from "prop-types"
const hexyjs = require("hexyjs")


export default function ColourMatch(){
	//state hooks
	const [colour, setColour] = useState(false)
	const [mixData, setMixData] = useState(false)
	const [colourList, setColourList] = useState([])
	const [similarColours, setSimilarColours] = useState([])
	const [maxDiff, setMaxDiff] = useState(50)
 
	
	//effects 
	useEffect(() => { //get mix data from public folder
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

	const handleChangeDiff = (event) => {///saves colour hex to hook value depending on colourNo
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
					justiftContent="center"
					xs={12}
					sm={6}
				>
					<Grid item>
						<TextField id="colour-match-input" label="Colour to match" variant="standard" onChange={handleChangeColour} />
						<TextField id="colour-match-diff" label="Max difference" variant="standard" type="number" onChange={handleChangeDiff} defaultValue={maxDiff} />
					</Grid>
					<Grid item>
						<ColourCard
							colourName="???"
							artistName="???"
							colourHex={`#${colour}`}
							date="1/1/2023"
						/>
					</Grid>
				</Grid>
				<Grid
					container 
					item
					direction="column"
					justiftContent="center"
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
								<ColourCard
									colourName={`${colour.mixData.colourName}`}
									artistName={`${colour.mixData.artist}`}
									colourHex={`${colour.mixData.colourHex}`}
									date={`#${colour.mixData.date}`}
									mini={true}
								/>
							</Grid>
						))}	
					</Grid>	
				</Grid>
			</Grid>
		</div>
	)
}


ColourMatch.propTypes = {
	colour: PropTypes.string, 
	mixData: PropTypes.object, 
	colourList: PropTypes.array, 
	similarColours: PropTypes.array, 
	maxDiff: PropTypes.number
}