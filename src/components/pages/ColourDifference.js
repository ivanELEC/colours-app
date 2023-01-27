import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {Grid, TextField, Button, Typography}  from "@material-ui/core"
import ColourCard from "../common/ColourCard"
import PropTypes from "prop-types"
import { getAllocatedColours, getSimilarColours } from "../../js/utils/colourMatch"
var cd = require("color-difference")

export default function ColourDifference() {

	//state hooks
	const [colour1, setColour1] = useState("ffffff")
	const [colour2, setColour2] = useState("000000")
	const [diffVal, setDiffVal] = useState(null)
	const [mixData, setMixData] = useState(false)
	const [colourList, setColourList] = useState([])
  
	//effect hooks

	const useStyles = makeStyles({
		root: {
			padding:25
		}
	})

	//effects 
	useEffect(() => { //get mix data from public folder
		fetch("/data/mixData.json")
			.then((res) => res.json())
			.then((data) => setMixData(data))
			.catch((err) => {
				logger.error("Failed to fetch mix data", err)
				throw new Error(err)
			})
	}, [])

	useEffect(() => { //flatten mixData to list of allocated colours
		if(mixData){
			let colours = getAllocatedColours(mixData)
			setColourList(colours)
		}
	}, [mixData])

	useEffect(() => {
		if(colourList){
			let sortedColours = getSimilarColours(colourList, "f51c1f", 20, 10)
			console.log(sortedColours)
		}
	}, [colourList])


	
	//functions
	const handleChange = (event) => {///saves colour hex to hook value depending on colourNo
		var inputElement = event.target
		var elementId = inputElement.id
		if(inputElement){
			if(elementId == "colour-1-input"){
				console.log(`#${inputElement.value}`)
				setColour1(inputElement.value)
			}
			else if(elementId == "colour-2-input"){
				console.log(`#${inputElement.value}`)
				setColour2(inputElement.value)
			}
		}
	}

	const calculateDiff = () => { //calculate the difference between the 2 colours
		let diff = cd.compare(colour1, colour2)
		setDiffVal(diff)
	}



	const classes = useStyles()

	return (
		<div className={classes.root}>
			<Grid
				container spacing={2}
				direction="column"
				justifyContent="center"
			>
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
							<TextField id="colour-1-input" label="Colour 1" variant="standard" onChange={handleChange} />
						</Grid>
						<Grid item>
							<ColourCard
								colourName="???"
								artistName="???"
								colourHex={`#${colour1}`}
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
						<Grid item>
							<TextField id="colour-2-input" label="Colour 2" variant="standard" onChange={handleChange} />
						</Grid>
						<Grid item>
							<ColourCard
								colourName="???"
								artistName="???"
								colourHex={`#${colour2}`}
								date="1/1/2023"
							/>
						</Grid>
					</Grid>
				</Grid>
				<Grid 
					container
					item
					direction="row"
				>
					<Grid item xs={6} sm={4}>
						<Button id="calc-difference-btn" variant="contained" onClick={calculateDiff}>Calculate</Button>
					</Grid>
					<Grid item xs={6} sm={4}>
						<Typography variant="h4">
						Difference: {diffVal}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</div>
	)
}

ColourDifference.propTypes = {
	colour1: PropTypes.string,
	colour2: PropTypes.string
}