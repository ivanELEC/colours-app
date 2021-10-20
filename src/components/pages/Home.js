import React from 'react';
import {Link} from 'react-router-dom';
//import { makeStyles } from '@material-ui/core/styles';
import ColourCard from '../common/ColourCard';
import Grid from '@material-ui/core/Grid';
import mixData from '../../data/mixData.json';
import { fadeInDown } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
const sortJsonArray = require('sort-json-array');


const styles = {
  fadeInDown: {
    animation: 'x 1s',
    animationName: Radium.keyframes(fadeInDown, 'fadeInDown')
  }
};

// const useStyles = makeStyles({
//   root: {
   
//   }
// }); 


//sort mix data by descending date
var sortedMixData = sortJsonArray(mixData.data,'datecode','des');


export default function Home() {
 // const classes = useStyles();
  
  return (
  <StyleRoot>
    <div style={styles.fadeInDown}>
      <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={2}
          >
              {sortedMixData.map(mix => (
                  <Grid key={mix} item xs={12} sm={6} md={4} lg={3}>
                  <Link to={{pathname: `/Mix/${mix.id}`}} style={{ textDecoration: 'none'}}>
                      <ColourCard
                          artistName={mix.artist} 
                          colourName={mix.colourName} 
                          colourHex={mix.colourHex} 
                          date={mix.date}
                          backgroundColour={mix.colourHex}
                          image={mix.imageUrl}
                      />
                    </Link>
                  </Grid> 
              ))}
          </Grid>
      </div>
   </StyleRoot> 
  );
}