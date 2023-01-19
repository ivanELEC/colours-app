import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import MixBoxMobile from "../common/MixBoxMobile"
import MixNavBar from "../navigation/MixNavBar"
import Image from "material-ui-image"
import { fadeInDown } from "react-animations"
import Radium, { StyleRoot } from "radium"

var sortJsonArray = require("sort-json-array")

export default function Mix() {
   //state hooks
   const [mixStates, setMixStates] = useState({
      mixMetadata: null,
      nextMix: null,
      previousMix: null,
      loaded: null
   })

	//get url param
	const { id } = useParams()

	useEffect(() => {
      //get mix data from public folder
      fetch("http://localhost:3000/data/mixData.json")
         .then((res) => res.json())
         .then((data) => {
            //select current mix from array
            let mixArray = data.data
            let mixMetadata = mixArray.filter((mix) => {
               return mix.id == id
            })[0]

				//sort retrieved mix data in descending date
				let sortedMixData = sortJsonArray(data.data, "date")

				//find index of current mix
            for (let i = 0; i < sortedMixData.length; i++) {
               if (sortedMixData[i].id === id) {
                  var currentMixIndex = i
               }
            }

				//use retrieveElementMix to return variables for previous and next mix (null if they don't exist)
				var previousMix = retrieveElementMix(currentMixIndex - 1, sortedMixData)
				var nextMix = retrieveElementMix(currentMixIndex + 1, sortedMixData)

				//set states for dynamic elements and indicate page elements should be loaded
				setMixStates({
					mixMetadata: mixMetadata,
					previousMixData: previousMix,
					nextMixData: nextMix,
               loaded: true
            })
         })
         .catch((err) => {
            throw new Error(err)
         })
   }, [id])

	useEffect(() => {
		console.log("Mix Metadata", mixStates.mixMetadata)
	}, [mixStates])

	//styles
	const styles = {
		fadeInDown: {
			animation: "x 1s",
			animationName: Radium.keyframes(fadeInDown, "fadeInDown")
      }
   }

	const useStyles = makeStyles({
		root: {},
		icon: {
			maxHeight: 75,
			maxWidth: 75
      }
   })

	const classes = useStyles()

	//functions
   /*function which returns contents of array element if it exists and null if it doesn't
        function returns null for negative array index numbers also  
    */
   function retrieveElementMix(index, data) {
      if (index < 0) {
         return null
      } else if (data[index]) {
         return data[index]
      } else {
         return null
      }
   }

	return (
		<div>
			{mixStates.loaded ? (
				<StyleRoot>
					<div style={styles.fadeInDown}>
                  <MixNavBar back={mixStates.previousMixData} forward={mixStates.nextMixData} />
                  <Grid container direction="row" justifyContent="center" alignItems="center">
                     <Grid item md={6} xs={12}>
                        <MixBoxMobile
                           artistName={mixStates.mixMetadata.artist}
                           colourName={mixStates.mixMetadata.colourName}
                           colourHex={mixStates.mixMetadata.colourHex}
                           date={mixStates.mixMetadata.date}
                           description={mixStates.mixMetadata.description}
                           mixUrl={mixStates.mixMetadata.link}
                           links={mixStates.mixMetadata.links}
                           embedId={mixStates.mixMetadata.embedId}
                        />
                     </Grid>
                  </Grid>
                  <Grid
                     container
                     direction="row"
                     justifyContent="center"
                     alignItems="center"
                     spacing={0}>
                     <Grid item xs={4} md={5} />
                     <Grid item xs={2}>
                        <Link to={{ pathname: "/" }}>
                           <Image
                              src="https://firebasestorage.googleapis.com/v0/b/colours-project.appspot.com/o/images%2Fbackicon.png?alt=media&token=ccf1bdfd-e667-4891-af5e-707a1304ae78"
                              className={classes.icon}
                              style={{ left: "30%" }}
                           />
                        </Link>
                     </Grid>
                     <Grid item xs={5} />
                  </Grid>
               </div>
            </StyleRoot>
         ) : (
            <div></div>
         )}
      </div>
   )
}
