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
	const minWidth = 300
	const useStyles = makeStyles({
		root: {
			minWidth: minWidth
		},
		paperCard: {
			minHeight: minWidth * 0.07,
			minWidth: minWidth * 0.07
		}
	})

	const classes = useStyles()

	
	return (
		<div className={classes.root}>
			<Grid 
				container
				direction="column-reverse"
				justifyContent="center"
				spacing={1}
			> 
				{props.grid.map((colourRow) => (
					<Grid item xs={12} key={props.grid.indexOf(colourRow)}>
						<ColourRow onSelectCell={props.onSelectCell} rowData={colourRow}/>
					</Grid>
				))}
			</Grid>
		</div>
	)
}

ColourGrid.propTypes = {
	grid: PropTypes.array,
	onSelectCell: PropTypes.func
} 