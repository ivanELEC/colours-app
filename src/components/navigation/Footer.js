import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import SendIcon from "@material-ui/icons/Send"

export default function Footer() {
	const useStyles = makeStyles({
		style: {
			backgroundColor: "#F8F8F8",
			borderTop: "1px solid #E7E7E7",
			textAlign: "left",
			position: "fixed",
			left: "0",
			bottom: "0",
			maxHeight: "40px",
			width: "100%",
			WebkitBoxSizing: "border-box",
			MozBoxSizing: "border-box",
			boxSizing: "border-box",
			padding: 5
		},
		phantom: {
			display: "block",
			maxHeight: "40px",
			width: "100%",
			WebkitBoxSizing: "border-box",
			MozBoxSizing: "border-box",
			boxSizing: "border-box",
			padding: 5
		},
	})

	const classes = useStyles()

	return (
		<div>
			<div className={classes.phantom} />
			<div className={classes.style}>
				<Grid
					container
					direction="row"
					justifyContent="space-between"
					alignItems="center"
				>
					<Grid item xs={7} md={3} style={{ fontSize: "14px" }}>
						<div style={{ fontFamily: "HelveticaBold" }}>Chroma</div>{" "}
						<div style={{ fontFamily: "HelveticaLight" }}>
							Akash Chohan + Ivan Yohuno, Est. 2020
						</div>
					</Grid>
					<Grid item xs={2} md={8}></Grid>
					<Grid
						item
						xs={3}
						md={1}
						container
						direction="row"
						justifyContent="space-between"
						alignItems="center"
					>
						<Grid item xs={6} />
						<Grid item xs={6}>
							<a
								style={{ color: "#000000", maxHeight: "70px" }}
								href="mailto:chromamixes@gmail.com"
								target="_top"
							>
								<SendIcon />
							</a>
						</Grid>
					</Grid>
				</Grid>
			</div>
		</div>
	)
}
