import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Grid from "@material-ui/core/Grid"
import Link from "@material-ui/core/Link"
import SoundcloudPlayer from "./SoundcloudPlayer"

export default function MixBoxMobile(props) {
	const useStyles = makeStyles({
		title: {
			fontFamily: "HelveticaBold",
			"font-size": 25,
			margin: 3,
			maxWidth: "100%",
		},
		subtitle: {
			fontFamily: "HelveticaLight",
			"font-size": 16,
			margin: 3,
			maxWidth: "100%",
		},
		content: {
			background: "#ffffff",
			margin: 3,
		},
		root: {
			minWidth: 250,
			minHeight: 480,
			padding: 0,
			margin: 25,
		},
	})

	const classes = useStyles()
	return (
		<Card className={classes.root}>
			<CardContent className={classes.content}>
				<Grid
					container
					direction="column"
					justifyContent="flex-start"
					alignItems="flex-start"
				>
					<Grid item xs={6}>
						<div className={classes.title}>
							<p>{props.artistName}</p>
						</div>
						<div className={classes.subtitle}>{props.colourName}</div>
						<div className={classes.subtitle}>{props.colourHex}</div>
						<div className={classes.subtitle}>{props.date}</div>
					</Grid>
					<Grid item xs={6}></Grid>
				</Grid>
				<Grid
					container
					direction="column"
					justifyContent="center"
					alignItems="center"
				>
					<Grid
						item
						xs={12}
						container
						direction="row"
						justifyContent="center"
						alignItems="center"
					>
						<Grid item xs={12}>
							<SoundcloudPlayer
								embedId={props.embedId}
								colourHex={props.colourHex}
							/>
						</Grid>
					</Grid>
					<p></p>
					<Grid item xs={12}>
						<div className={classes.subtitle}>{props.description}</div>
					</Grid>
					<Grid
						item
						xs={12}
						container
						direction="row"
						justifyContent="leftAlign"
						alignItems="leftAlign"
					>
						{props.links.map((link) => (
							<Grid item xs={4} key={link}>
								<Link
									href={link.url}
									target="_blank"
									className={classes.subtitle}
								>
									{link.name}
								</Link>
							</Grid>
						))}
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	)
}

MixBoxMobile.propTypes = {
	embedId: PropTypes.string,
	colourHex: PropTypes.string,
	colourName: PropTypes.string,
	artistName: PropTypes.string,
	date: PropTypes.string,
	links: PropTypes.array,
	description: PropTypes.string,
}
