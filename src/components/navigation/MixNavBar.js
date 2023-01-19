import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import { Link } from "react-router-dom"
import Box from "@material-ui/core/Box"
import { Card, CardContent } from "@material-ui/core"
var tinycolor = require("tinycolor2")

/*function that uses the tiny-colour library to determine whether text should be white or black
depending on the brightness of the input colour (brightness range from 0 to 255)
anything under the brightness threshold returns hex for white, anything brightness threshold or over returns hex for black 
*/
function getTextShade(colourObj) {
	var colourBrightness = colourObj.getBrightness()
	var brightnessThreshold = 165
	if (parseInt(colourBrightness) > brightnessThreshold) {
		return "#38383b"
	} else if (parseInt(colourBrightness) <= brightnessThreshold) {
		return "#ffffff"
	}
}

export default function MixNavBar(props) {
	const useStyles = makeStyles({
		root: {},
		paper: {
			padding: "0px",
			margin: "0px",
		},
		title: {
			fontFamily: "HelveticaBold",
		},
		subtitle: {
			fontFamily: "HelveticaLight",
		},
	})

	const classes = useStyles()

	//get text shades for navigation buttons
	if (props.back) {
		var colour1Obj = tinycolor(props.back.colourHex)
		var colour1TextShade = getTextShade(colour1Obj)
	}
	if (props.forward) {
		var colour2Obj = tinycolor(props.forward.colourHex)
		var colour2TextShade = getTextShade(colour2Obj)
	}

	return (
		<Grid container direction="row" justifyContent="center" alignItems="center">
			<Grid item xs={5} md={3}>
				{props.back ? (
					<Card className={classes.root}>
						<CardContent
							className={classes.paper}
							height="100%"
							style={{ paddingBottom: "0px", minHeight: "45px" }}
						>
							<Link
								to={{ pathname: `/Mix/${props.back.id}` }}
								style={{ textDecoration: "none" }}
							>
								<Grid
									item
									xs={12}
									container
									direction="row"
									justifyContent="flex-start"
									alignItems="center"
									spacing={0}
								>
									<Grid item xs={8}>
										<div
											height="100%"
											style={{
												background: props.back.colourHex,
												minHeight: "45px",
											}}
										>
											<Box component="span" style={{ color: colour1TextShade }}>
												<div style={{ padding: "5px" }}>
													<div className={classes.title}>
														{props.back.artist}
													</div>
													<div className={classes.subtitle}>
														{props.back.colourName}
													</div>
												</div>
											</Box>
										</div>
									</Grid>
									<Grid item xs={4} />
								</Grid>
							</Link>
						</CardContent>
					</Card>
				) : (
					<Box component="span" />
				)}
			</Grid>
			<Grid item xs={2} md={6} />
			<Grid item xs={5} md={3}>
				{props.forward ? (
					<Card className={classes.root}>
						<CardContent
							className={classes.paper}
							height="100%"
							style={{ paddingBottom: "0px", minHeight: "45px" }}
						>
							<Link
								to={{ pathname: `/Mix/${props.forward.id}` }}
								style={{ textDecoration: "none" }}
							>
								<Grid
									item
									xs={12}
									container
									direction="row"
									justifyContent="flex-start"
									alignItems="center"
									spacing={0}
								>
									<Grid item xs={8}>
										<div
											height="100%"
											style={{
												background: props.forward.colourHex,
												minHeight: "45px",
											}}
										>
											<Box component="span" style={{ color: colour2TextShade }}>
												<div style={{ padding: "5px" }}>
													<div className={classes.title}>
														{props.forward.artist}
													</div>
													<div className={classes.subtitle}>
														{props.forward.colourName}
													</div>
												</div>
											</Box>
										</div>
									</Grid>
									<Grid item xs={4} />
								</Grid>
							</Link>
						</CardContent>
					</Card>
				) : (
					<Box component="span" />
				)}
			</Grid>
		</Grid>
	)
}

MixNavBar.propTypes = {
	back: PropTypes.object,
	forward: PropTypes.object,
}
