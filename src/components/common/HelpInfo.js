import React from "react"
import { makeStyles } from "@mui/styles"
import { Box } from "@mui/material"

/*
	Information panel box for help modal pop up
*/

export default function Card() {
	//styles
	const useStyles = makeStyles({
		root: {
			position: "absolute",
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -50%)",
			width: 500,
			maxWidth: "75%",
			maxHeight: "60%",
			overflow: "auto",
			backgroundColor: "#ffffff",
			boxShadow: 24,
			padding: 25
		},
		title: {
			fontFamily: "HelveticaBold",
			fontSize: "3vh"
		},
		subtitle: {
			fontFamily: "HelveticaBold",
			fontSize: "2.5vh",
			paddingBottom: 5
		},
		paragraphText:{
			fontFamily: "HelveticaLight",
			fontSize: "2.2vh",
			paddingBottom: 3
		}
	})

	const classes = useStyles()

	return(
		<Box className={classes.root}>
			<div id="modal-help-title" className={classes.title}>
				Help
			</div>
			<br></br>
			<div id="modal-help-description" className={classes.paragraphText} >
				<div className={classes.subtitle}> How to find Mixes </div>
				<p>Each mix card clicks through to a page to read more information about a mix and listen to it.</p>
				<p>You can see all mixes by navigating to the Menu and clicking <q>See All Mixes.</q></p>
				<p>You can also click on the <q>Search by..</q> option select to search for mixes by Artist Name, Mix Name and Description</p>
				<p>The colour grid and colour selector allow you to choose a colour that filters down to mixes of a similar hue.</p>
				<p>You can either click a colour on the colour grid, or type in a hex code (6 characters) in the colour selector text field.</p>
				<p>Colour differences are calculated using <a href="https://observablehq.com/@luciyer/euclidian-distance-in-rgb-color-space">Euclidean distance</a></p>
				<div className={classes.subtitle}> Hex Codes </div>
				<p>Hex codes are a way of representing R(ed) G(reen) B(lue) colours.</p>
				<p>Hex codes are split into 3 elements which are 2 symbols in length each.</p>
				<p>First element represents RED, second element represents GREEN and the third element represents BLUE.</p>
				<p>Each symbol is a <a href="https://www.mathsisfun.com/hexadecimals.html"> hexadecmial number.</a></p>
				<p>For example #<span style={{textDecoration: "underline wavy red", color: "red"}}>aa</span><span style={{textDecoration: "underline wavy green", color: "green"}}>21</span><span style={{textDecoration: "underline wavy blue", colour: "blue"}}>df</span> mixes:</p>
				<p>A red value of 170, a green value of 33 and a blue value of 223, which produces a <span style={{backgroundColor: "#aa21df", color: "#ffffff", textDecoration: "underline white"}}>blue-ish purple colour.</span></p>
			</div>
		</Box>
	) 
}