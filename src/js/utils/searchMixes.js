import { getSimilarColours } from "./colourMatch"

export function searchMixes(colourList, mixData, searchType, searchTerm){
	const formattedMixData = getSimilarColours(colourList, "ffffff", 100, 10000, mixData)
	
	let filteredMixData = formattedMixData.filter((mix) => {
		if(searchType == "mix name"){
			return mix.mixData.colourName.toLowerCase().match(`${searchTerm.toLowerCase()}+`) !== null
		}
		else if(searchType == "artist"){
			return mix.mixData.artist.toLowerCase().match(`${searchTerm.toLowerCase()}+`) !== null
		}
		else if(searchType == "description"){
			return mix.mixData.description.toLowerCase().match(`${searchTerm.toLowerCase()}+`) !== null
		}
	})

	return filteredMixData
}