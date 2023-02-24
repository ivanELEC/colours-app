import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import { Grid, Paper } from "@material-ui/core"

export default function ColourRow(props) {
	//state hooks

	//effects

	//functions
	
	//styles
	var minHeight = 20
	var minWidth = 20
	if(props.mini){
		minHeight = 40
		minWidth = 40
	}
	const useStyles = makeStyles({
		root: {
			
		},
		paperCard: {
			minHeight: minHeight,
			minWidth: minWidth,
      "&:hover": {
				transform: "translateY(2px)",
				"-webkit-transform": "translateY(2px)",
				transition: ".3s ease",
			},
		}
	})

	const classes = useStyles()

	
	return (
		<div className={classes.root}>
			<Grid
				container
				direction="row"
				spacing={1} 
				justifyContent="flex-start"
			>	
				{props.rowData.map((colour) => (
					<Grid item key={colour.index} xs={1}> 
						<Paper 
							onClick={props.onSelectCell}
							className={classes.paperCard} 
							style={{"backgroundColor":`${colour.colourHex}`}}
						/>
					</Grid>
				))}
			</Grid>
		</div>
	)
}

ColourRow.propTypes = {
	rowData: PropTypes.array,
	onSelectCell: PropTypes.func,
	mini: PropTypes.bool
} 