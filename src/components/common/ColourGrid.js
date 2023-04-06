import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@mui/styles"
import { Grid } from "@mui/material"
import ColourRow from "./ColourRow"

export default function ColourGrid(props) {
	//constants/variables
	const minWidth = 300
	var minGridWidth = minWidth
	var overflowMode = "hidden"
	
	//styles
	if(props.mini){
		overflowMode = "auto"
		minGridWidth = minWidth * 2.7
	}

	const useStyles = makeStyles({
		root: {
			minWidth: minWidth,	
			"overflow-x": overflowMode,
			"overflow-y": "hidden",
			padding: 5
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
							<div data-cy={`chroma-grid-row-${props.grid.indexOf(colourRow)}`}>
								<ColourRow 
									mini={props.mini}
									onSelectCell={props.onSelectCell}
									rowData={colourRow}/>
							</div>
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