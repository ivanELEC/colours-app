import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import { Grid } from "@material-ui/core"
import ColourRow from "./ColourRow"

export default function ColourGrid(props) {
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
				direction="column-reverse"
				spacing={1}
				xs={12}
			> 
				{props.grid.map((colourRow) => (
					<Grid item xs={12} sm={6} key={props.grid.indexOf(colourRow)} spacing={1}>
						<ColourRow rowData={colourRow}/>
					</Grid>
				))}
			</Grid>
		</div>
	);
}

ColourGrid.propTypes = {
	grid: PropTypes.array
} 