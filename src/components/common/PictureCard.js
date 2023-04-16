import React from "react"
import PropTypes from "prop-types"
import Card from "./Card"
import { makeStyles } from "@mui/styles"

/*
A simple card with an image, a title and some content
*/
export default function PictureCard(props) {
	//variables for size of component - reduces if mini = true
	var maxHeightHeader = 280
	var minHeightContent = 140
	var minHeight = 300
	var minWidth = 275

	//styles
	if(props.mini){
		maxHeightHeader = 150
		minHeight = 170
		minWidth = 220
		minHeightContent = 110
	}

	var mediaOverlayStyles = {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		height: "100%",
		width: "100%",
		opacity: 0,
		transition: "1.7s ease",
		backgroundColor: `${props.colourHex}`,
		maxHeight: maxHeightHeader,
		minHeight: minHeight
	}

	var mediaStyles = {
		minHeight: minHeight,
		backgroundImage: `url("${props.image}")`,
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		backgroundColor: `${props.colourHex}`,
	}

	if(props.colourFirst){
		mediaOverlayStyles.backgroundImage = `url("${props.image}")`
		mediaOverlayStyles.backgroundSize =  "cover"
		mediaOverlayStyles.backgroundRepeat = "no-repeat"
		mediaOverlayStyles.backgroundPosition = "center"
		delete mediaStyles.backgroundImage
	}

	const useStyles = makeStyles({
		root: {
			minWidth: minWidth,
			minHeight: minHeight,
			maxWidth: 400,
			borderRadius: 4,
			fontFamily: "HelveticaLight",
			fontSize: 16,
			color: "black",
			padding: 10,
			margin: "auto", 
		},
		mediaContainer: {
			position: "relative",
			"&:hover": {
				opacity: 1,
				"& > $mediaOverlay": {
					opacity: 1,
				},
			},
		},
		mediaOverlay: mediaOverlayStyles,
		media: mediaStyles,
		content: {
			background: "#ffffff",
			padding: 10,
			margin: 3,
			minHeight: minHeightContent
		},
		title: {
			fontFamily: "HelveticaBold",
			"font-size": 25,
			margin: 3,
		},
	})

	const classes = useStyles()

	return (
		<div className={classes.root}>
			<Card>
				<div className={classes.mediaContainer} role="img" aria-label={props.altText}>
					<div className={classes.media} />
					<div data-cy="chroma-colour-overlay" className={classes.mediaOverlay} />
				</div>
				<div className={classes.content}>
					<div className={classes.title}>{props.artistName}</div>
					<p />
					<div>{props.colourName}</div>
					<div>{props.colourHex}</div>
					<div>{props.date}</div>
				</div>
			</Card>
		</div>
	)
}

PictureCard.propTypes = {
	altText: PropTypes.string,
	image: PropTypes.string,
	colourHex: PropTypes.string,
	colourName: PropTypes.string,
	artistName: PropTypes.string,
	date: PropTypes.string,
	mini: PropTypes.bool,
	colourFirst: PropTypes.bool
}
