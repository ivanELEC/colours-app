import React, { useEffect, useState } from "react"
import { makeStyles } from "@mui/styles"
import { Grid, Menu, MenuItem, Button } from "@mui/material"

export default function Footer() {
  //hooks
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  //functions
  const handleClick = (event) => {
    console.log(event.currentTarget.id)
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
			padding: 5
		},
		phantom: {
			display: "block",
			width: "100%",
			WebkitBoxSizing: "border-box",
			MozBoxSizing: "border-box",
			boxSizing: "border-box",
			padding: 5,
		},
	})

	const classes = useStyles()

	return (
		<div>
      <Button
        id="footer-menu-button"
        aria-controls={open ? 'footer-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{position: "fixed", bottom: 10, right: 15, zIndex: 1000}}
      >
        Menu
      </Button>
      <Menu
        id="footer-menu"
        aria-labelledby="footer-menu-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 0,
          horizontal: 0,
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
			<div className={classes.phantom} />
			<div className={classes.style}>
				<Grid
					container
					direction="row"
					justifyContent="space-between"
					alignItems="center"
				>
					<Grid item xs={7} md={3} style={{ fontSize: "2.8vh" }}>
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
						</Grid>
					</Grid>
				</Grid>
			</div>
		</div>
	)
}
