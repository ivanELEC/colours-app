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
	var minGridWidth = minWidth
	var overflowMode = "hidden"
	
	if(props.mini){
		overflowMode = "auto"
		minGridWidth = minWidth * 2.6
	}

	const useStyles = makeStyles({
		root: {
			minWidth: minWidth,	
			"overflow-x": overflowMode,
			"overflow-y": "hidden"
		},
		grid: {
			minWidth: minGridWidth
		}
	})

	const classes = useStyles()

	
	return (
		<div className={classes.root}>
			<div className={classes.grid}>
				<Grid 
					container
					direction="column-reverse"
					justifyContent="center"
					spacing={1}
				> 
					{props.grid.map((colourRow) => (
						<Grid item xs={12} key={props.grid.indexOf(colourRow)}>
							<ColourRow mini={props.mini} onSelectCell={props.onSelectCell} rowData={colourRow}/>
						</Grid>
					))}
				</Grid>
			</div>
		</div>
	)
}

ColourGrid.propTypes = {
	grid: PropTypes.array,
	onSelectCell: PropTypes.func,
	mini: PropTypes.bool
} 