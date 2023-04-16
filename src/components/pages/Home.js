import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { makeStyles } from "@mui/styles"
import Grid from "@mui/material/Grid"
import { fadeInDown } from "react-animations"
import Radium, { StyleRoot } from "radium"
import PictureCard from "../common/PictureCard"
import Footer from "../navigation/Footer"
const sortJsonArray = require("sort-json-array")

export default function Home() {
	//state hooks
	const [mixData, setMixData] = useState(false)
	const [sortedMixData, setSortedMixData] = useState(false)
	const [dataLoaded, setDataLoaded] = useState(false)

	//effect hooks

	useEffect(() => {
		//get mix data from public folder
		fetch("/data/mixData.json")
			.then((res) => res.json())
			.then((data) => setMixData(data))
			.catch((err) => {
				console.log("Failed to fetch mix data", err)
				throw new Error(err)
			})
	}, [])

	useEffect(() => {
		//sort retrieved mix data in descending date
		try {
			let dataIn = sortJsonArray(mixData.data, "datecode")
			setSortedMixData(dataIn)
			setDataLoaded(true)
		} catch (err) {
			console.log("Failed to sort mix data", err)
		}
	}, [mixData])

	//styles
	const styles = {
		fadeInDown: {
			animation: "x 1.3s",
			animationName: Radium.keyframes(fadeInDown, "fadeInDown"),
		}
	}

	const useStyles = makeStyles({
		root: {
			alignItems: "center",
		},
		card: {
			"&:hover": {
				transform: "translateY(10px)",
				"-webkit-transform": "translateY(10px)",
				transition: ".3s ease",
			},
		},
	})
	const classes = useStyles()

	return (
		<div>
			{dataLoaded ? (
				<StyleRoot>
					<div className={classes.root} style={styles.fadeInDown}>
						<Grid
							container
							direction="row"
							justifyContent="center"
							alignItems="center"
							spacing={0}
							id="chroma-mix-grid"
						>
							{sortedMixData.map((mix) => (
								<Grid key={mix.id} item xs={12} sm={6} md={4} lg={3}>
									<Link
										to={{ pathname: `/Mix/${mix.id}` }}
										style={{ textDecoration: "none" }}
									>
										<div
											id={`chroma-mix-item-${mix.id}`}
											className={classes.card}
										>
											<PictureCard
												imgAltText={mix.altText}
												artistName={mix.artist}
												colourName={mix.colourName}
												colourHex={mix.colourHex}
												date={mix.date}
												image={mix.imageUrl}
												mini={false}
												colourFirst={false}
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
			<Footer/>
		</div>
	)
}
