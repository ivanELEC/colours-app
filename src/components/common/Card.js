import React from "react"
import { makeStyles } from "@material-ui/core/styles"

/*
Basic white card with shadow 
*/

export default function Card(props) {
	const useStyles = makeStyles({
		root: {
			minWidth: 275,
			minHeight: 480,
			maxWidth: 350,
			fontFamily: "HelveticaLight",
			fontSize: 16,
			borderRadius: 4,
			transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
			backgroundColor: "#ffffff",
			overflow: "hidden",
			boxShadow:
                "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"
		}
	})

	const classes = useStyles()

	return <div className={classes.root}>{props.children}</div>
}
