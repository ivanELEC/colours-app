import React from "react"
import Card from "./Card"
import { makeStyles } from "@material-ui/core/styles"

/*
A simple card with an image, a title and some content
*/
export default function PictureCard(props) {
	const useStyles = makeStyles({
		root: {
			minWidth: 230,
			minHeight: 480,
			maxWidth: 400,
			borderRadius: 4,
			fontFamily: "HelveticaLight",
			fontSize: 16,
			color: "black",
			padding: 10
		},
		mediaContainer: {
			position: "relative",
			"&:hover": {
				opacity: 1,
				"& > $mediaOverlay": {
					opacity: 1
				}
			}
		},
		mediaOverlay: {
			position: "absolute",
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
			height: "100%",
			width: "100%",
			opacity: 0,
			transition: ".5s ease",
			backgroundColor: `${props.colourHex}`
		},
		media: {
			minHeight: 300,
			backgroundImage: `url("${props.image}")`,
			backgroundSize: "cover",
			backgroundRepeat: "no-repeat",
			backgroundPosition: "center",
			backgroundColor: `${props.colourHex}`
		},
		content: {
			background: "#ffffff",
			padding: 3,
			margin: 3
		},
		title: {
			fontFamily: "HelveticaBold",
			"font-size": 25,
			margin: 3
		}
	})

    const classes = useStyles()

	return (
		<div className={classes.root}>
			<Card>
				<div className={classes.mediaContainer}>
					<div className={classes.media} />
					<div className={classes.mediaOverlay} />
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
