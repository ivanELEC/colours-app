import React from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { makeStyles  } from "@mui/styles"
import { Grid, Menu, MenuItem, Button } from "@mui/material"
import { useHistory, useLocation } from "react-router-dom"


export default function Footer() {
	const history = useHistory()
	const location = useLocation()

	//hooks
	const [anchorEl, setAnchorEl] = React.useState(null)
	const [anchorPosCoordinates, setAnchorPosCoordinates] = React.useState({top:0, left:0})
	const open = Boolean(anchorEl)
  
	//functions
	const handleClick = (event) => {
		let targetCoordinates = {
			top: event.currentTarget.offsetTop,  
			left: event.currentTarget.offsetLeft
		}
		setAnchorPosCoordinates(targetCoordinates)
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const seeAllMixes = () => { //reloads ColourMatch if already on ColourMatch, else goes to ColourMatch
		let currentRoute = location.pathname
		if(currentRoute == "/"){
			history.go(0)
		}
		else{
			history.push("/")
		}
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
								aria-controls={open ? 'footer-menu' : undefined}
								aria-haspopup="true"
								aria-expanded={open ? "true" : undefined}
								onClick={handleClick}
								color="neutral"
								sx={{fontFamily:  "HelveticaBold" }}
							>
								Menu
							</Button>
							<Menu
								id="footer-menu"
								aria-labelledby="footer-menu-button"
								anchorEl={anchorEl}
								open={open}
								onClose={handleClose}
								anchorPosition={{ top: anchorPosCoordinates.top, left: anchorPosCoordinates.left }}
							>
								<MenuItem sx={{fontFamily: "HelveticaLight" }} onClick={seeAllMixes}>See All Mixes</MenuItem>
								<MenuItem sx={{fontFamily: "HelveticaLight" }} onClick={handleClose}>Help</MenuItem>
								<MenuItem sx={{fontFamily: "HelveticaLight" }} onClick={handleClose}>Contact Us</MenuItem>
							</Menu>
							</Grid>
						</Grid>
					</Grid>
				</div>
			</div>
		</ThemeProvider>
	)
}
