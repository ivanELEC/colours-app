import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@mui/styles"
import Grid from "@mui/material/Grid"
import { Link } from "react-router-dom"
import Box from "@mui/material/Box"
import { Card, CardContent } from "@mui/material"
import { getTextShade } from "../../js/utils/colourMatch"

export default function MixNavBar(props) {
	//styles
	const useStyles = makeStyles({
		root: {},
		paper: {
			padding: 0,
			margin: 0,
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
		var colour1TextShade = getTextShade(props.back.colourHex)
	}
	if (props.forward) {
		var colour2TextShade = getTextShade(props.forward.colourHex)
	}

	return (
		<nav id="mixnavbar">
			<Grid container direction="row" justifyContent="center" alignItems="center">
				<Grid item xs={5} md={3}>
					{props.back ? (
						<Card className={classes.root}>
							<CardContent
								className={classes.paper}
								height="100%"
								style={{ padding: "0px", minHeight: "45px" }}
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
								style={{ padding: "0px", minHeight: "45px" }}
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
		</nav>
	)
}

MixNavBar.propTypes = {
	back: PropTypes.object,
	forward: PropTypes.object,
}
