import React, {useEffect, useState} from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { makeStyles  } from "@mui/styles"
import HelpInfo from "../common/HelpInfo"
import { Grid, Menu, MenuItem, Button, Modal, Checkbox, FormControlLabel } from "@mui/material"
import { useHistory, useLocation } from "react-router-dom"
import { useGlobalState } from "../../js/utils/globalState"

export default function Footer() {
	//constants and variables
	const history = useHistory()
	const location = useLocation()
	const currentRoute = location.pathname

	//hooks
	const [anchorEl, setAnchorEl] = useState(null)
	const [anchorPosCoordinates, setAnchorPosCoordinates] = useState({top:0, left:0})
	const [showHomepageOptions, setShowHomepageOptions] = useState(false)
	const [openHelp, setOpen] = useState(false)
	//custom hook for global states
	const [state, dispatch] = useGlobalState()

	const openMenu = Boolean(anchorEl)

	//effects
	useEffect(() => { 
		//if we are at home, show extra options in menu
		if(currentRoute === "/"){ 
			setShowHomepageOptions(true)
		}
	},[])

	//functions
	const handleClickMenu = (event) => {
		let targetCoordinates = {
			top: event.currentTarget.offsetTop,  
			left: event.currentTarget.offsetLeft
		}
		setAnchorPosCoordinates(targetCoordinates)
		setAnchorEl(event.currentTarget)
	}

	const handleCloseMenu = () => {
		setAnchorEl(null)
	}

	const handleOpenHelp = () => setOpen(true)
	const handleCloseHelp = () => setOpen(false)

	const seeAllMixes = () => { //reloads ColourMatch if already on ColourMatch, else goes to ColourMatch
		if(currentRoute === "/"){
			history.go(0)
		}
		else{
			history.push("/")
		}

	}

	const contactUs = () => {
		window.location.href = "mailto:chromamixes@gmail.com"
	}

	const help = () => {
		handleOpenHelp()
	}

	const invertColourMatch = () => {
		if(state.invertColours){
			dispatch({ invertColours: false })
		}
		else{
			dispatch({ invertColours: true })
		}
		console.log(state.invertColours)
	}

	//styling
	const useStyles = makeStyles({
		style: {
			backgroundColor: "#F8F8F8",
			borderTop: "1px solid #E7E7E7",
			textAlign: "left",
			position: "fixed",
			left: "0",
			bottom: "0",
			width: "100%",
			WebkitBoxSizing: "border-box",
			MozBoxSizing: "border-box",
			boxSizing: "border-box",
			paddingLeft: 5,
			paddingRight: 5
		},
		phantom: {
			display: "block",
			width: "100%",
			WebkitBoxSizing: "border-box",
			MozBoxSizing: "border-box",
			boxSizing: "border-box",
			paddingLeft: 5,
			paddingRight: 5
		},
		spacing: {
			marginTop: 50
		}
	})

	//themes
	const theme = createTheme({
		palette: {
			neutral: {
				main: "#000000",
				contrastText: "#ffffff",
			},
		},
	})

	const classes = useStyles()

	return (
		<ThemeProvider theme={theme}>
			<footer>
				<Modal
					open={openHelp}
					onClose={handleCloseHelp}
					aria-labelledby="modal-help-title"
					aria-describedby="modal-help-description"
				>
					<HelpInfo/>
				</Modal>
				<div className={classes.spacing} />
				<div className={classes.phantom} />
				<div className={classes.style}>
					<Grid
						container
						direction="row"
						justifyContent="space-between"
						alignItems="center"
					>
						<Grid item xs={7} md={3} style={{ fontSize: "2.4vh" }}>
							<div style={{ fontFamily: "HelveticaBold" }}>Chroma</div>
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
							<Grid item xs={5} />
							<Grid item xs={7} sx={{paddingRight: 15}}>
								<menu id="menu">
									<Button
										id="footer-menu-button"
										aria-controls={openMenu ? "footer-menu" : undefined}
										aria-haspopup="true"
										aria-expanded={openMenu ? "true" : undefined}
										onClick={handleClickMenu}
										color="neutral"
										sx={{fontFamily:  "HelveticaBold", fontSize: "2vh", paddingRight: 10}}
									>
										Menu
									</Button>
								</menu>
								<Menu
									id="footer-menu"
									aria-labelledby="footer-menu-button"
									anchorEl={anchorEl}
									open={openMenu}
									onClose={handleCloseMenu}
									anchorPosition={{ top: anchorPosCoordinates.top, left: anchorPosCoordinates.left }}
								>
									<MenuItem sx={{fontFamily: "HelveticaLight" }} onClick={seeAllMixes}>See All Mixes</MenuItem>
									<MenuItem sx={{fontFamily: "HelveticaLight" }} onClick={help}>Help</MenuItem>
									<MenuItem sx={{fontFamily: "HelveticaLight" }} onClick={contactUs}>Contact Us</MenuItem>
									{
										showHomepageOptions?
											(
												<MenuItem>
													<FormControlLabel 
														label={<div style={{fontFamily: "HelveticaLight" }}>Invert Colour Matching</div>}
														labelPlacement="start"
														control={
															<Checkbox 
																color="neutral"
																checked={state.invertColours}
																onChange={invertColourMatch}
															/>
														}
														sx={{marginLeft:0, marginRight: 0}}
													/>
												</MenuItem>
											)
											:
											(
												<div></div>
											)
									}
								</Menu>
							</Grid>
						</Grid>
					</Grid>
				</div>
			</footer>
		</ThemeProvider>
	)
}
