import hexRgb from "hex-rgb"
var tinycolor = require("tinycolor2")
const Color = require("color")

export function getAllocatedColours(mixData){//flatten and output a list of colours present in mixData
	let data = mixData.data
	let colours = data.map((element) =>{
		let code = element.colourHex
		code = code.slice(1,7)
		return code
	})
	return colours
}

export function getSimilarColours(colourList, inputColour, maxDifference=100, maxColours=5, mixData=null,invert=false, sortByDate=false){
/*
	Returns a list of colours similar to inputColour from an input colourList
	maxDifference is the max difference in scale the colours picked can be (max is 1)
	maxColours is the max number of colours in the list 
	if mixData is populated - it will pick out the mix information for each colour and include it in the data
*/

	let selectedColours = []
	let sortedColours = []

	sortedColours = colourList.map((colour)=>{
		let colourDiff = getEuclideanDistance(colour, inputColour)
		let colourHex = `#${colour}`
		let textShade = getTextShade(colourHex)
		let data = null
		if(mixData){
			data = findMixData(mixData, colour)
		}
		return {"colourDiff": colourDiff, "colour": colour, "textShade": textShade, "mixData": data}
	})

	sortedColours.sort((a,b) => {
		return parseFloat(a.colourDiff) - parseFloat(b.colourDiff)
	})

	if(invert){
		sortedColours.reverse()
	}

	if(sortByDate){
		sortedColours.sort((a,b) => {
			return parseFloat(a.mixData.datecode) - parseFloat(b.mixData.datecode)
		})
	}

	selectedColours = sortedColours.splice(0,maxColours)

	selectedColours = selectedColours.filter((element) => {
		if(invert){
			return parseFloat(element.colourDiff) > (90 - maxDifference)
		}
		else{
			return parseFloat(element.colourDiff) <= maxDifference
		}
		
	})

	return selectedColours
}

function findMixData(data, colourHex){
	data = data.data
	let selectedData = data.filter((mix) => {
		return mix.colourHex === `#${colourHex}`
	})
	
	if(selectedData){
		return selectedData[0]
	}
	else{
		return null
	}
}

export function getTextShade(colour) {
	/*function that uses the tiny-colour library to determine whether text should be white or black
	depending on the brightness of the input colour (brightness range from 0 to 255)
	anything under the brightness threshold returns hex for white, anything brightness threshold or over returns hex for black 
	*/
	let colourObj = tinycolor(colour)
	let colourBrightness = colourObj.getBrightness()
	let brightnessThreshold = 165
	if (parseInt(colourBrightness) > brightnessThreshold) {
		return "#000000"
	} else if (parseInt(colourBrightness) <= brightnessThreshold) {
		return "#ffffff"
	}
}

export function colourGradientColumn(gridData, column, colourHex){
	/* function will set the colours of one column (# column - 0 indexed) in gridData 
	 to a scale of one colour, going from the colour (colourHex) and lightening by an equal 
	 lightness factor in each row*/
	var colour = Color(colourHex, "hex")
	var lightenFactor = 1/(gridData.length * 1.27)
	for(let i = 0; i<gridData.length; i++){
		gridData[i][column].colourHex = colour.hex()
		colour = colour.lighten(lightenFactor)
	}

	return gridData
}

export function getEuclideanDistance(colour1, colour2){
	if (colour1===colour2) {
		return 0
	}

	colour1 = hexRgb(colour1)
	colour2 = hexRgb(colour2)
	
	
	function squaredDelta(v1, v2) {
		return Math.pow(v1 - v2, 2)
	}
	
	var sum = 0
	sum += squaredDelta(colour1.red,   colour2.red)
	sum += squaredDelta(colour1.green, colour2.green)
	sum += squaredDelta(colour1.blue,  colour2.blue)

	var conversionIndex = 19.5075

	return Math.sqrt(sum / conversionIndex)
}