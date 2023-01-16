//utils to handle functions for colour comparison and grouping
var cd = require('color-difference');

export function getAllocatedColours(mixData){//flatten and output a list of colours present in mixData
	let data = mixData.data
	let colours = data.map((element) =>{
		let code = element.colourHex
		code = code.slice(1,7)
		return code
	})
	return colours
}

export function getSimilarColours(maxDifference=1, maxColours){//returns a list of colours 
	
}