import React from "react"
import { makeStyles } from "@mui/styles"
import { useHistory } from "react-router-dom"

export default function BackButton() {
	
	const iconUrl = "https://images2.imgbox.com/ca/e6/5ZAy0lzE_o.png"
	const history = useHistory()
	const useStyles = makeStyles({
		root: {},
		icon: {
			maxHeight: 75,
		}
	})

	const classes = useStyles()
	
	return (
		<div style={{ margin: "auto", width: "50%", textAlign: "center" }}>
			<img
				alt="back button"
				onClick={() => history.push("/")}
				src={iconUrl}
				className={classes.icon}
				style={{ "margin": "auto" }}
			/>
		</div>
	)
	
}