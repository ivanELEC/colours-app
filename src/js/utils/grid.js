export function gridData(rows=10, columns=10, width=50, height=50) {
	var data = new Array()
	var xpos = 1 //starting xpos and ypos at 1 so the stroke will show when we make the grid below
	var ypos = 1

	// iterate for rows	
	for (var row = 0; row < rows; row++) {
		data.push( new Array() )
		
		// iterate for cells/columns inside rows
		for (var column = 0; column < columns; column++) {
			data[row].push({
				index: column,
				x: xpos,
				y: ypos,
				width: width,
				height: height,
				colourHex: "#ffffff"
			})
			// increment the x position. I.e. move it over by 50 (width variable)
			xpos += width
		}
		// reset the x position after a row is complete
		xpos = 1
		// increment the y position for the next row. Move it down 50 (height variable)
		ypos += height	
	}
	return data
}