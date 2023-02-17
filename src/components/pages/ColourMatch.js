import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"
import { gridData } from "../../js/utils/grid"
import {Grid, Paper, TextField, InputAdornment}  from "@material-ui/core"
import PictureCard from "../common/PictureCard"
import { getAllocatedColours, getSimilarColours, colourGradientColumn, getTextShade } from "../../js/utils/colourMatch"
import ColourGrid from "../common/ColourGrid"
import Radium, { StyleRoot } from "radium"
import { fadeInRight } from "react-animations"
const hexyjs = require("hexyjs")
const Color = require("color")



export default function ColourMatch(){
	//constants
	const maxDiff = 50
	
	//state hooks
	const [colour, setColour] = useState("ffffff")
	const [oldColour, setOldColour] = useState("ffffff")
	const [selectedColour, setSelectedColour] = useState("ffffff")
	const [mixData, setMixData] = useState(false)
	const [colourList, setColourList] = useState([])
	const [titleTextColour, setTitleTextColour] = useState("38383b")
	const [similarColours, setSimilarColours]  = useState([])
	const [grid, setGrid] = useState(false)

	const colourPalette = ["#E42406", "#EC6E08", "#EC9508", "#ECF701","#CFFF00", "#2DC84D", "#14C7D1", "#147BD1", "#2700FF", "#443BBD", "#753BBD", "#BD3B89"]
 
	
	//effects 
	useEffect(() => {
		//generate grid
		let grid = gridData(10,12)
		for(let i = 0; i < colourPalette.length; i++){
			console.log(`creating column for colour ${colourPalette[i]}`)
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

	useEffect(() => { //retrieve list of similar colours and set title text colour
		let validHex = hexyjs.isHex(`${colour}`)
		console.log(colour)
		if(validHex && mixData.data){
			let textColour = getTextShade(colour)
			setSelectedColour(colour)
			setTitleTextColour(textColour)
			if(colourList.length > 0){
				let sortedColours = getSimilarColours(colourList, colour, parseFloat(maxDiff), 10, mixData)
				setSimilarColours(sortedColours)
			}
		}
	}, [colourList, colour, mixData])

	//functions 
	const handleChangeColour = (event) => {///saves colour hex to hook value depending on colourNo
		var inputElement = event.target
		var elementId = inputElement.id
		if(inputElement){
			if(elementId == "colour-match-input"){
				if(inputElement.value){
					if(inputElement.value.length == 6){
						setOldColour(colour) //set old colour so that when page re-renders we can use it to transition to the new one 
						setColour(inputElement.value)
					}
				}
			}
		}
	}

	const handleSelectColour = (event) => { //saves colour hex on selected colour grid to hook value and colour-match-input 
		var inputElement = event.target
		if(inputElement){
			setOldColour(colour) //set old colour so that when page re-renders we can use it to transition to the new one 
			let colourRgb = window.getComputedStyle( inputElement ,null).getPropertyValue("background-color") 
			const colourObj = Color(colourRgb)
			let colourHex = colourObj.hex()
			colourHex = colourHex.slice(1)
			colourHex = colourHex.toLocaleLowerCase()
			let colourMatchElement = document.getElementById("colour-match-input")
			colourMatchElement.value = colourHex	
			setColour(colourHex)
		}
	}

	//styles
	var colourTransitionKeyframes = Radium.keyframes({
		"0%": {
			"background-color": `#${oldColour}`
		},
		"100%": {
			"background-color": `#${selectedColour}`
		}
	}, "colourTransition")

	var styles = {
		titlePaperTop:{
			animation: "2s forwards",
			animationName: colourTransitionKeyframes,
			backgroundColour: `#${selectedColour}`,
			minHeight: "40%"
		},
		titleColourSelect: {
			fontSize: "5vh",
			verticalAlign: "middle",
			fontFamily: "HelveticaLight",
			color: titleTextColour,
			borderColor: titleTextColour
		},
		fadeInRight: {
			animation: "1.5s",
			animationName: Radium.keyframes(fadeInRight, "fadeInRight"),
		}
	}
	
	const useStyles = makeStyles({
		root: {
			padding: 25,
			fontFamily: "HelveticaLight",
			"& .MuiInput-underline:before":{
				borderColor: titleTextColour
			},
			"& .MuiInput-underline:after":{
				borderColor: titleTextColour
			},
			"& .MuiInput-underline:hover:not(.Mui-disabled):before":{
				borderBottom: `2px solid ${titleTextColour} !important`
			},
		},
		colourPaper: {
			minHeight: 40,
			textAlign: "center",
		},
		titleCard: {
			fontSize: "5vh",
			width: "100%",
			height: "100%",
			minHeight: 150,
			minWidth: 250,
			textAlign: "center",
			verticalAlign: "middle",
			fontFamily: "HelveticaBold",
			border: 0,
			color: titleTextColour,
		}, 
		titleColourSelect: {
			fontSize: "5vh",
			verticalAlign: "middle",
			fontFamily: "HelveticaLight",
			color: titleTextColour,
			borderColor: titleTextColour
		},	
		titlePaperBottom: {
			color: "black",
			paddingTop: "1em"
		}
	})
	
	const classes = useStyles()

	return (
		<StyleRoot>
			<div className={classes.root}>
				<Grid
					container 
					direction="column"
					justifyContent="flex-start"
					spacing={4}
				>
					<Grid 
						container
						item
						direction="row"
						justifyContent="flex-start"
						spacing={2}
					>
						<Grid item xs={12} sm={12} md={5}>
							{grid?(
								<ColourGrid grid={grid} onSelectCell={handleSelectColour} />
							):(
								<div></div>
							)}
						</Grid>
						<Grid item xs={12} sm={12} md={7}>
							<Paper 
								className={classes.titleCard}
								elevation={1}
							>
								<div  style={styles.titlePaperTop}>
									<TextField
										disable="true"
										InputProps={{
											startAdornment: <InputAdornment position="start"><div className={classes.titleColourSelect}>#</div></InputAdornment>,
											style: styles.titleColourSelect
										}}
										id="colour-match-input"
										variant="standard" 
										defaultValue={selectedColour}
										onChange={handleChangeColour} 
									/>
								</div>
								<div className={classes.titlePaperBottom}>Chroma</div>
							</Paper>
						</Grid>
					</Grid>
					<Grid 
						container 
						item
						direction="row"
						justifyContent="flex-start"
					>
						<Grid
							container 
							item
							direction="column"
							justifyContent="flex-start"
						>
							<div style={styles.fadeInRight} key={selectedColour}>
								<Grid
									container
									item
									direction="row"
									justifyContent="flex-start"
									alignItems="center"
									spacing={2}
								>
									{similarColours.map((colour) => (
										
										<Grid key={colour.colour} item xs={12} sm={6} md={3}>
											<Link
												to={{ pathname: `/Mix/${colour.mixData.id}` }}
												style={{ textDecoration: "none" }}
											>
												<PictureCard
													colourName={`${colour.mixData.colourName}`}
													artistName={`${colour.mixData.artist}`}
													colourHex={`${colour.mixData.colourHex}`}
													date={`${colour.mixData.date}`}
													image={colour.mixData.imageUrl}
													mini={true}
													colourFirst={true}
												/>
											</Link>
										</Grid>
									))}	
								</Grid>	
							</div>
						</Grid>
					</Grid>
				</Grid>
			</div>
		</StyleRoot>
	)
}