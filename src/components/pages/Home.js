import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import { fadeInDown } from "react-animations"
import Radium, { StyleRoot } from "radium"
import PictureCard from "../common/PictureCard"
import { useWinstonLogger } from "winston-react"
const sortJsonArray = require("sort-json-array")

export default function Home() {
   //init logger
   const logger = useWinstonLogger()

   //state hooks
   const [mixData, setMixData] = useState(false)
   const [sortedMixData, setSortedMixData] = useState(false)
   const [dataLoaded, setDataLoaded] = useState(false)

   //effect hooks

   useEffect(() => {
		//get mix data from public folder
      logger.info("Fetching mix data")
      fetch("http://localhost:3000/data/mixData.json")
         .then((res) => res.json())
         .then((data) => setMixData(data))
         .catch((err) => {
            logger.error("Failed to fetch mix data", err)
            throw new Error(err)
         })
   }, [])

   useEffect(() => {
      //sort retrieved mix data in descending date
      logger.info("Sorting mix data")
      try {
         let dataIn = sortJsonArray(mixData.data, "datecode")
         setSortedMixData(dataIn)
         setDataLoaded(true)
      } catch (err) {
         logger.error("Failed to sort mix data", err)
      }
   }, [mixData])

   //sort mix data by descending date
   const useStyles = makeStyles({
      root: {
         animation: "x 1s",
         animationName: Radium.keyframes(fadeInDown, "fadeInDown"),
         alignItems: "center"
      },
      card: {
         "&:hover": {
            transform: "translateY(10px)",
            "-webkit-transform": "translateY(10px)",
            transition: ".3s ease"
         }
      }
   })
   const classes = useStyles()

   return (
      <div>
         {dataLoaded ? (
            <StyleRoot>
               <div className={classes.root}>
                  <Grid
                     container
                     direction="row"
                     justifyContent="center"
                     alignItems="center"
                     spacing={0}
                     id="chroma-mix-grid">
                     {sortedMixData.map((mix) => (
                        <Grid key={mix.id} item xs={12} sm={6} md={4} lg={3}>
                           <Link
                              to={{ pathname: `/Mix/${mix.id}` }}
                              style={{ textDecoration: "none" }}>
                              <div id={`chroma-mix-item-${mix.id}`} className={classes.card}>
                                 <PictureCard
                                    artistName={mix.artist}
                                    colourName={mix.colourName}
                                    colourHex={mix.colourHex}
                                    date={mix.date}
                                    image={mix.imageUrl}
                                 />
                              </div>
                           </Link>
                        </Grid>
                     ))}
                  </Grid>
               </div>
            </StyleRoot>
         ) : (
            <div></div>
         )}
      </div>
   )
}
