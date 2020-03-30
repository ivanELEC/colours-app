import React from 'react';
import {useParams, Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MixBoxMobile from '../common/MixBoxMobile';
import MixNavBar from '../navigation/MixNavBar';
import mixData from '../../data/mixData.json';

var sortJsonArray = require('sort-json-array');
var jsonQuery = require('json-query');

const useStyles = makeStyles({
  root: {
   
  }
}); 

export default function Mix() {
    const classes = useStyles();
    
    //extract mix data from JSON with URL parameters
    let id = useParams();
    const mixMetadata = jsonQuery('data[id='+ id.id + ']',
    {
        data: mixData
    });

    //sort mixes by date and extract previous and next mix
    const sortedMixData = sortJsonArray(mixData.data,'date');
    //find index of current mix
    var currentMixIndex=0;
    for(let i = 0; i < sortedMixData.length; i++) {
        if(sortedMixData[i].id==id.id){
            currentMixIndex=i;
        }
    }
     /*function which returns contents of array element if it exists and null if it doesn't
      function returns null for negative array index numbers also  
    */
    function retrieveElementMix(index,data){
        if(index<0){
            return null;
        }
        else if(data[index]){
            return data[index];
        }
        else{
            return null;
        }
    }
    //use retrieveElementMix to return variables for previous and next mix (null if they don't exist)
    var previousMixData = retrieveElementMix(currentMixIndex-1,sortedMixData)
    var nextMixData = retrieveElementMix(currentMixIndex+1,sortedMixData)

    return ( 
        <div>
            <MixNavBar
                back={previousMixData}
                forward={nextMixData}
            />
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item md={6} xs={12}>
                    <MixBoxMobile
                    artistName={mixMetadata.value.artist}
                    colourName={mixMetadata.value.colourName}
                    colourHex={mixMetadata.value.colourHex}
                    date={mixMetadata.value.date}
                    description={mixMetadata.value.description}
                    mixUrl={mixMetadata.value.link}
                    links={mixMetadata.value.links}
                    embedId={mixMetadata.value.embedId}
                    />
                </Grid>
            </Grid>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item xs={5}/>
                <Grid item xs={2}>
                    <Link to={{pathname: `/`}}>
                        <img src="../../../public/media/images/Home-Icon-Rainbow.png"/> 
                    </Link>
                </Grid>
                <Grid item xs={5}/>
            </Grid>
        </div>
    );
}