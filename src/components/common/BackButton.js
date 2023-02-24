import React from "react"
import { makeStyles } from "@mui/styles"
import { useHistory } from "react-router-dom"

export default function BackButton() {
	
	const iconUrl = "https://firebasestorage.googleapis.com/v0/b/colours-project.appspot.com/o/images%2Fbackicon.png?alt=media&token=ccf1bdfd-e667-4891-af5e-707a1304ae78"
	let history = useHistory()
	const useStyles = makeStyles({
		root: {},
		icon: {
			maxHeight: 75,
		}
	})

	const classes = useStyles()
	
	return (
		<div style={{ "margin": "auto", "width": "50%", "text-align": "center" }}>
			<img
				alt="back button"
				onClick={() => history.goBack()}
				src={iconUrl}
				className={classes.icon}
				style={{ "margin": "auto" }}
			/>
		</div>
	)
	
}