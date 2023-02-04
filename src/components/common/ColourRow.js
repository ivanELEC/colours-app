import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import { Grid, Paper } from "@material-ui/core"

export default function ColourRow(props) {
	//state hooks

	//effects

	//functions
	
	//styles
	const useStyles = makeStyles({
		root: {
			
		},
		paperCard: {
			minHeight: 20,
			minWidth: 20
		}
	})

	const classes = useStyles()

	
	return (
		<div className={classes.root}>
			<Grid
				container
				direction="row"
				spacing={1} 
			>	
				{props.rowData.map((colour) => (
					<Grid item key={colour.index} xs={1}> 
						<Paper 
							className={classes.paperCard} 
							style={{"backgroundColor":`${colour.colourHex}`}}
						/>
					</Grid>
				))}
			</Grid>
		</div>
	);
}

ColourRow.propTypes = {
	rowData: PropTypes.array
} 