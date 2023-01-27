//utils to handle functions for colour comparison and grouping

function getAllocatedColours(mixData){//flatten and output a list of colours present in mixData
	let data = mixData.data;	
	let colours = data.map((element) =>{
		let code = element.colourHex
		code = code.slice(1,6)
		return code
	});
	return colours
}