//utils to handle functions for colour comparison and grouping
var cd = require("color-difference")

export function getAllocatedColours(mixData){//flatten and output a list of colours present in mixData
	let data = mixData.data
	let colours = data.map((element) =>{
		let code = element.colourHex
		code = code.slice(1,7)
		return code
	})
	return colours
}

export function getSimilarColours(colourList, inputColour, maxDifference=100, maxColours=5){
/*
	Returns a list of colours similar to inputColour from an input colourList
	maxDifference is the max difference in scale the colours picked can be (max is 1)
	maxColours is the max number of colours in the list 
*/

	let selectedColours = []
	let sortedColours = []

	sortedColours = colourList.map((colour)=>{
		let colourDiff = cd.compare(colour, inputColour)
		return {"colourDiff": colourDiff, "colour": colour}
	})

	sortedColours.sort((a,b) => {
		return parseFloat(a.colourDiff) - parseFloat(b.colourDiff)
	})

	console.log(sortedColours)
	selectedColours = sortedColours.splice(0,maxColours)

	selectedColours = selectedColours.filter((element) => {
		return parseFloat(element.colourDiff) <= maxDifference
	})

	return selectedColours
	
}