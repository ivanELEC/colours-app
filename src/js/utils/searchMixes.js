import { getSimilarColours } from "./colourMatch"

export function searchMixes(colourList, mixData, searchType, searchTerm) {
	const formattedMixData = getSimilarColours(colourList, "ffffff", 100, 10000, mixData)

	if(searchTerm==null){
		return formattedMixData
	}
	
	let filteredMixData = formattedMixData.filter((mix) => {
		if (searchType == "mix name") {
			if (searchTerm) {
				return mix.mixData.colourName.toLowerCase().match(`${searchTerm.toLowerCase()}+`) !== null
			}
			else {
				return 1 === 0
			}

		}
		else if (searchType == "artist") {
			if (searchTerm) {
				return mix.mixData.artist.toLowerCase().match(`${searchTerm.toLowerCase()}+`) !== null
			}
			else {
				return 1 === 0
			}
		}
		else if (searchType == "description") {
			if (searchTerm) {
				return mix.mixData.description.toLowerCase().match(`${searchTerm.toLowerCase()}+`) !== null
			}
			else {
				return 1 === 0
			}
		}
	})

	return filteredMixData || []
}