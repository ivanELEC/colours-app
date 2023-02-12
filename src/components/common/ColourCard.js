import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import { Card, CardContent, CardHeader, CardMedia } from "@material-ui/core"

/*
This colour card component is used for the homepage of the application
each card has a:
backgroundColour: colour of the header background
colourHex: hex code for colour, used for both light title and header background
artistName: Name of artist in bold
colourName: Worded name of colour in light
date: date of mix in light
mini: true/false - if true, use smaller version of component
*/

export default function ColourCard(props) {
	//variables for size of component - reduces if mini = true
	var minHeightHeader = 300
	var minHeight = 480
	var minWidth = 275

	if(props.mini == true){
		minHeightHeader = 100
		minHeight = 170
		minWidth = 220
	}

	const useStyles = makeStyles({
		title: {
			fontFamily: "HelveticaBold",
			"font-size": 25,
			margin: 3,
		},
		subtitle: {
			fontFamily: "HelveticaLight",
			"font-size": 16,
			margin: 3,
		},
		content: {
			background: "#ffffff",
			margin: 3,
			padding: 3,
		},
		header: {
			minHeight: minHeightHeader,
		},
		root: {
			minWidth: minWidth,
			minHeight: minHeight,
			maxWidth: 350,
			padding: 0,
			margin: 25,
		},
	})

	const classes = useStyles()

	return (
		<Card className={classes.root}>
			{props.image ? (
				<CardMedia className={classes.header} image={props.image} />
			) : (
				<CardHeader
					className={classes.header}
					style={{ background: props.colourHex }}
				/>
			)}
			<CardContent className={classes.content}>
				<div className={classes.title}>
					<p>{props.artistName}</p>
				</div>
				<div className={classes.subtitle}>{props.colourName}</div>
				<div className={classes.subtitle}>{props.colourHex}</div>
				<div className={classes.subtitle}>{props.date}</div>
			</CardContent>
		</Card>
	)
}

ColourCard.propTypes = {
	image: PropTypes.string,
	colourHex: PropTypes.string,
	colourName: PropTypes.string,
	artistName: PropTypes.string,
	date: PropTypes.string,
	mini: PropTypes.bool
}
