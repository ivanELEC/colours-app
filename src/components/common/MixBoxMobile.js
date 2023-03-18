import {React, useState, useEffect} from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@mui/styles"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Link from "@mui/material/Link"
import Modal from  "@mui/material/Modal"
import Box from  "@mui/material/Box"
import ImageIcon from "@mui/icons-material/Image"
import { getTextShade } from "../../js/utils/colourMatch"
import SoundcloudPlayer from "./SoundcloudPlayer"

export default function MixBoxMobile(props) {
	//hooks
	const [openImage, setOpenImage] = useState(false)
	const [titleTextColour, setTitleTextColour] = useState("ffffff")
	const [highlightColour, setHighlightColour] = useState("1d9bf0")

	useEffect(() => { //set text colour for highlighted text
		let textColour = getTextShade(props.colourHex)
		setHighlightColour(props.colourHex)
		setTitleTextColour(textColour)
	}, [])

	//functions
	const handleOpenImage = () => setOpenImage(true)
	const handleCloseImage = () => setOpenImage(false)

	//styles
	const useStyles = makeStyles({
		title: {
			fontFamily: "HelveticaBold",
			"font-size": 25,
			margin: 3,
			maxWidth: "100%",
			"&::selection":{
				background: `${highlightColour}`,
				color: `${titleTextColour}`
			},
			"&::-moz-selection":{
				background:`${highlightColour}`,
				color: `${titleTextColour}`
			}	
		},
		titleSpan: {
			textDecoration: `underline wavy ${props.colourHex}`,
			textUnderlineOffset: "0.3em",
			"&::selection":{
				background: `${highlightColour}`,
				color: `${titleTextColour}`
			},
			"&::-moz-selection":{
				background:`${highlightColour}`,
				color: `${titleTextColour}`
			}	
		},
		subtitle: {
			fontFamily: "HelveticaLight",
			"font-size": 16,
			margin: 3,
			maxWidth: "100%",
			"&::selection":{
				background: `${highlightColour}`,
				color: `${titleTextColour}`
			},
			"&::-moz-selection":{
				background:`${highlightColour}`,
				color: `${titleTextColour}`
			}	
		},
		content: {
			background: "#ffffff",
			margin: 3,
			padding: 20,
			"&::selection":{
				background: `${highlightColour}`,
				color: `${titleTextColour}`
			},
			"&::-moz-selection":{
				background:`${highlightColour}`,
				color: `${titleTextColour}`
			}	
		},
		root: {
			minWidth: 250,
			minHeight: 480,
			margin: 25,
			"&::selection":{
				background: `${highlightColour}`,
				color: `${titleTextColour}`
			},
			"&::-moz-selection":{
				background:`${highlightColour}`,
				color: `${titleTextColour}`
			}	
		},
		cardImageExpand: {
			position:"relative", 
			bottom: "100%",
			left: "97%",
			"& :hover": {
				color: "#444444"
			},
			"&::selection":{
				background: `${highlightColour}`,
				color: `${titleTextColour}`
			},
			"&::-moz-selection":{
				background:`${highlightColour}`,
				color: `${titleTextColour}`
			}	
		},
		imageModal:{
			position: "absolute",
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -50%)",
			width: 500,
			maxWidth: "75%",
			maxHeight: "60%",
			overflow: "auto",
			backgroundColor: "#ffffff",
			borderWidth: 0,
			boxShadow: 24,
			padding: 25,
			"&::selection":{
				background: `${highlightColour}`,
				color: `${titleTextColour}`
			},
			"&::-moz-selection":{
				background:`${highlightColour}`,
				color: `${titleTextColour}`
			}	
		}, 
		imagePosition: {
			margin: "auto", 
			width: "100%",
			padding:5
		}
	})

	const classes = useStyles()
	return (
		<div className={classes.root}>
			<Modal
				open={openImage}
				onClose={handleCloseImage}
				aria-labelledby="modal-image-title"
				aria-describedby="modal-image-description"
			>
				<Box className={classes.imageModal}>
					<img className={classes.imagePosition} src={props.imageUrl} alt={props.description} />
				</Box>
			</Modal>
			<Paper className={classes.content}>
				<Grid
					container
					direction="column"
					justifyContent="flex-start"
					alignItems="flex-start"
				>
					<Grid item xs={6}>
						<div>
							<p className={classes.title}>{props.artistName} - <span className={classes.titleSpan}>{props.colourName}</span></p>
						</div>
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
						justifyContent="flex-start"
						alignItems="flex-start"
					>
						{props.links.map((link) => (
							<Grid item xs={4} key={link.url}>
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
				< ImageIcon onClick={handleOpenImage} className={classes.cardImageExpand} />
			</Paper>
		</div>
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
	imageUrl: PropTypes.string
}
