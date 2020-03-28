import React from 'react';
import {useParams} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
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
    
    return ( 
        <div>
            <MixNavBar
                
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
                    />
                </Grid>
            </Grid>
        </div>
    );
}