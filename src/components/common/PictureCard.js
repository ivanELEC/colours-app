import React, { useState, useEffect, createRef } from "react"
import PropTypes from "prop-types"
import Card from "./Card"
import VolumeUpIcon from "@mui/icons-material/VolumeUp"
import VolumeOffIcon from "@mui/icons-material/VolumeOff"
import { Link } from "react-router-dom"
import { makeStyles } from "@mui/styles"
import loadscript from 'load-script'


/*
A simple card with an image, a title and some content
*/
export default function PictureCard(props) {
	//string that stores url for mix
	const srcString =
		"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" +
		props.embedId +
		"&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"

	// state hooks
	const [isPlaying, setIsPlaying] = useState(false)
	const [player, setPlayer] = useState(false)
	const [autoPlay, setAutoPlay] = useState(true)
	const [displayVolumeOn, setDisplayVolumeOn] = useState("none")
	const [displayVolumeOff, setDisplayVolumeOff] = useState("block")


	const iframeRef = createRef()

	// initialization - load soundcloud widget API and set SC event listeners

	useEffect(() => {
		if(!autoPlay){
			setDisplayVolumeOff("none")
			setDisplayVolumeOn("none")
		}
		// use load-script module to load SC Widget API
		loadscript('https://w.soundcloud.com/player/api.js', () => {

		// initialize player and store reference in state
		const player = window.SC.Widget(iframeRef.current)
		setPlayer( player )

		const { PLAY, PLAY_PROGRESS, PAUSE, READY, FINISH, ERROR } = window.SC.Widget.Events

		player.bind( READY, function(){
			player.bind( PLAY, () => {
				// update state to playing
				setIsPlaying(true)
			})
	
			player.bind( PAUSE, () => {
				// update state if player has paused - must double check isPaused since false positives
				player.isPaused( (playerIsPaused) => {
					if (playerIsPaused){
						setIsPlaying(false)
					} 
				})
			})
		})
	})}, [])

	// adjust playback in SC player to match isPlaying state
	useEffect(() => {
		if (player){
			if(autoPlay){
				player.isPaused( (playerIsPaused) => {
					if (isPlaying && playerIsPaused) {
						player.play()
					} 
					else if(!isPlaying && !playerIsPaused){
						player.pause()
					}
				})
			}
		
		}
		else{
			return // player loaded async - make sure available
		} 		
	},[isPlaying])

	const audioToggle = () => {	
		if(isPlaying){
			setDisplayVolumeOn("none")
			setDisplayVolumeOff("block")
			setIsPlaying(false)
		}
		else{
			setDisplayVolumeOn("block")
			setDisplayVolumeOff("none")
			setIsPlaying(true)
		}
	}

	//styles
	//variables for size of component - reduces if mini = true
	var maxHeightHeader = 280
	var minHeightContent = 140
	var minHeight = 300
	var minWidth = 275

	if(props.mini == true){
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
		soundIcon: {
			position: "relative", 
			bottom: "90%", 
			left: "90%"
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
		<div
		 	className={classes.root}  
		>
			<div>
				<Card>
					<Link
						to={{ pathname: `${props.link}` }}
						style={{ textDecoration: "none", margin: "auto" }}
					>
						<div className={classes.mediaContainer}>
							<div className={classes.media} />
							<div className={classes.mediaOverlay} />
						</div>
					</Link>
					<div className={classes.content}>
						<div className={classes.title}>{props.artistName}</div>
						<p />
						<div>{props.colourName}</div>
						<div>{props.colourHex}</div>
						<div>{props.date}</div>
						<VolumeUpIcon onClick={audioToggle} style={{display: displayVolumeOn}} className={classes.soundIcon}/>
						<VolumeOffIcon onClick={audioToggle} style={{display: displayVolumeOff}} className={classes.soundIcon}/>
					</div>
				</Card>
			</div>
			<iframe 
				ref={iframeRef}
				id={`sc-iframe-${props.artistName}-${props.colourName}`} 
				style={{display: "none"}}
				allow="autoplay"
				src={srcString}
			></iframe>
		</div>
	)
}

PictureCard.propTypes = {
	image: PropTypes.string,
	colourHex: PropTypes.string,
	colourName: PropTypes.string,
	artistName: PropTypes.string,
	date: PropTypes.string,
	mini: PropTypes.bool,
	colourFirst: PropTypes.bool
}
