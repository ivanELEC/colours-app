//utils to handle functions for colour comparison and grouping
var cd = require("color-difference")
var tinycolor = require("tinycolor2")

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
		let colourHex = `#${colour}`
		let textShade = getTextShade(colourHex)
		return {"colourDiff": colourDiff, "colour": colour, "textShade": textShade}
	})

	sortedColours.sort((a,b) => {
		return parseFloat(a.colourDiff) - parseFloat(b.colourDiff)
	})

	selectedColours = sortedColours.splice(0,maxColours)

	selectedColours = selectedColours.filter((element) => {
		return parseFloat(element.colourDiff) <= maxDifference
	})

	return selectedColours
}

/*function that uses the tiny-colour library to determine whether text should be white or black
depending on the brightness of the input colour (brightness range from 0 to 255)
anything under the brightness threshold returns hex for white, anything brightness threshold or over returns hex for black 
*/
export function getTextShade(colour) {
	let colourObj = tinycolor(colour)
	let colourBrightness = colourObj.getBrightness()
	let brightnessThreshold = 165
	if (parseInt(colourBrightness) > brightnessThreshold) {
		return "#38383b"
	} else if (parseInt(colourBrightness) <= brightnessThreshold) {
		return "#ffffff"
	}
}