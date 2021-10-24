import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import mixData from '../../data/mixData.json';
import { fadeInDown } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import PictureCard from '../common/PictureCard';
const sortJsonArray = require('sort-json-array');




export default function Home() {
  //sort mix data by descending date
  var sortedMixData = sortJsonArray(mixData.data, 'datecode', 'des');
  const useStyles = makeStyles({
    root: {
      animation: 'x 1s',
      animationName: Radium.keyframes(fadeInDown, 'fadeInDown'),
      alignItems: "center"
    },
    card: {
      "&:hover": {
        transform: "translateY(10px)",
        transition: ".3s ease"
      }
    }
  });
  const classes = useStyles();

  return (
    <StyleRoot>
      <div className={classes.root}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={0}
        >
          {sortedMixData.map(mix => (
            <Grid key={mix} item xs={12} sm={6} md={4} lg={3}>
              <Link to={{ pathname: `/Mix/${mix.id}` }} style={{ textDecoration: 'none' }}>
                <div className={classes.card}>
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
  );
}