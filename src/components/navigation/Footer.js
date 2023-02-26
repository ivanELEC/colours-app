import React from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { makeStyles  } from "@mui/styles"
import { Grid, Menu, MenuItem, Button, Modal, Box } from "@mui/material"
import { useHistory, useLocation } from "react-router-dom"


export default function Footer() {
	const history = useHistory()
	const location = useLocation()

	//hooks
	const [anchorEl, setAnchorEl] = React.useState(null)
	const [anchorPosCoordinates, setAnchorPosCoordinates] = React.useState({top:0, left:0})
	const [openHelp, setOpen] = React.useState(false);

	const openMenu = Boolean(anchorEl)

  
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

	const handleOpenHelp = () => setOpen(true);
	const handleCloseHelp = () => setOpen(false);

	const seeAllMixes = () => { //reloads ColourMatch if already on ColourMatch, else goes to ColourMatch
		let currentRoute = location.pathname
		if(currentRoute == "/"){
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
			padding: 5,
		},
		phantom: {
			display: "block",
			width: "100%",
			WebkitBoxSizing: "border-box",
			MozBoxSizing: "border-box",
			boxSizing: "border-box",
			padding: 5,
		},
		spacing: {
			marginTop: 50
		},
		helpModal: {
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
			width: 500,
			maxWidth: "75%",
			maxHeight: "60%",
			overflow: "auto",
			backgroundColor: "#ffffff",
			boxShadow: 24,
			padding: 25
		},
		helpModalTitle: {
			fontFamily: "HelveticaBold",
			fontSize: "3vh"
		},
		helpModalSubTitle: {
			fontFamily: "HelveticaBold",
			fontSize: "2vh",
			paddingBottom: 5
		},
		helpModalText:{
			fontFamily: "HelveticaLight",
			fontSize: "1.7vh",
			paddingBottom: 3
		}
	})

	//themes
	const theme = createTheme({
		palette: {
			neutral: {
			main: '#000000',
			contrastText: '#ffffff',
			},
		},
	});

	const classes = useStyles()

	return (
		<ThemeProvider theme={theme}>
			<div>
			<Modal
				open={openHelp}
				onClose={handleCloseHelp}
				aria-labelledby="modal-help-title"
				aria-describedby="modal-help-description"
			>
				<Box className={classes.helpModal}>
					<div id="modal-help-title" className={classes.helpModalTitle}>
						Help
					</div>
					<br></br>
					<div id="modal-help-description" className={classes.helpModalText} >
						<div className={classes.helpModalSubTitle}> How to find Mixes </div>
						<p>Each mix card clicks through to a page to read more information about a mix and listen to it</p>
						<p>You can see all mixes by navigating to the Menu and clicking "See All Mixes"</p>
						<p>The colour grid and colour selector allow you to choose a colour that filters down to mixes of a similar hue</p>
						<p>You can either click a colour on the colour grid, or type in a hex code (6 characters) in the colour selector text field</p>
						<div className={classes.helpModalSubTitle}> Hex Codes </div>
						<p>Hex codes are a way of representing R(ed) G(reen) B(lue) colours</p>
						<p>Hex codes are split into 3 elements which are 2 symbols in length each</p>
						<p>First element represents RED, second element represents GREEN and the third element represents BLUE</p>
						<p>Each symbol is a <a href="https://www.mathsisfun.com/hexadecimals.html"> hexadecmial number</a></p>
						<p>For example #<span style={{textDecoration: "underline wavy red", color: "red"}}>aa</span><span style={{textDecoration: "underline wavy green", color: "green"}}>21</span><span style={{textDecoration: "underline wavy blue", colour: "blue"}}>df</span> mixes:</p>
						<p>A red value of 170, a green value of 33 and a blue value of 223, which produces a <span style={{backgroundColor: "#aa21df", color: "#ffffff", textDecoration: "underline white"}}>blue-ish purple colour</span></p>
					</div>
				</Box>
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
							<Grid item xs={7}>
							<Button
								id="footer-menu-button"
								aria-controls={openMenu ? 'footer-menu' : undefined}
								aria-haspopup="true"
								aria-expanded={openMenu ? "true" : undefined}
								onClick={handleClickMenu}
								color="neutral"
								sx={{fontFamily:  "HelveticaBold" }}
							>
								Menu
							</Button>
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
							</Menu>
							</Grid>
						</Grid>
					</Grid>
				</div>
			</div>
		</ThemeProvider>
	)
}
