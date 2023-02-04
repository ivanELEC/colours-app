import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {Grid, TextField, Button, Typography}  from "@material-ui/core"
import ColourCard from "../common/ColourCard"
import PropTypes from "prop-types"
var cd = require("color-difference")

export default function ColourDifference() {

	//state hooks
	const [colour1, setColour1] = useState("ffffff")
	const [colour2, setColour2] = useState("000000")
	const [diffVal, setDiffVal] = useState(null)
  
	//effect hooks

	//styles
	const useStyles = makeStyles({
		root: {
			padding:25
		}
	})

	
	//functions
	const handleChange = (event) => {///saves colour hex to hook value depending on colourNo
		var inputElement = event.target
		var elementId = inputElement.id
		if(inputElement){
			if(elementId == "colour-1-input"){
				setColour1(inputElement.value)
			}
			else if(elementId == "colour-2-input"){
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
						justifyContent="center"
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
						justifyContent="center"
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