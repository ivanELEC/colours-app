import { getSimilarColours } from "./colourMatch"

export function searchMixes(colourList, mixData, searchType, searchTerm){
	const formattedMixData = getSimilarColours(colourList, "ffffff", 100, 10000, mixData)
	
	let filteredMixData = formattedMixData.filter((mix) => {
		if(searchType == "mix name"){
			return mix.mixData.colourName.match(`${searchTerm}+`) !== null
		}
		else if(searchType == "artist"){
			return mix.mixData.artist.match(`${searchTerm}+`) !== null
		}
		else if(searchType == "description"){
			return mix.mixData.description.match(`${searchTerm}+`) !== null
		}
	})

	return filteredMixData
}