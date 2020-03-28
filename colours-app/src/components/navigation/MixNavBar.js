import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import Box from '@material-ui/core/Link';
var tinycolor = require("tinycolor2");

const colour1 = '#06b19d';
const colour2 = '#5306b1';

const useStyles = makeStyles({
  root: {
   
  }
}); 

/*function that uses the tiny-colour library to determine whether text should be white or black
depending on the brightness of the input colour (brightness range from 0 to 255)
anything under 125 returns hex for white, anything 125 or over returns hex for black 
*/
function getTextShade(colourObj){
    var colourBrightness = colourObj.getBrightness();
    if(parseInt(colourBrightness)>124){
        return '#000000'
    }
    else if(parseInt(colourBrightness)<=124){
        return '#ffffff'
    }
}

export default function MixNavBar(props) {
    const classes = useStyles();

    //get text shades for navigation buttons
    if(props.back){
        var colour1Obj = tinycolor(props.back.colourHex);
        var colour1TextShade = getTextShade(colour1Obj);
    }
    if(props.forward){
        var colour2Obj = tinycolor(props.forward.colourHex);
        var colour2TextShade = getTextShade(colour2Obj);
    }
       
    return ( 
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Grid item xs={4}>
                {
                    props.back?(
                        <div style={{background: props.back.colourHex}}>
                            <Link to={{pathname: `/Mix/${props.back.id}`}} style={{ textDecoration: 'none'}}>
                                <Box component="span" style={{ color: colour1TextShade}}>
                                    <div>{props.back.artist}</div>
                                    <div>{props.back.colourName}</div>
                                </Box>
                            </Link>
                        </div>
                         
                    ):(
                        <Box component="span"/>
                    )
                }
           </Grid>
           <Grid item xs={4}/>
           <Grid item xs={4}>
                {
                    props.forward?(
                        <div style={{background: props.forward.colourHex}}>
                            <Link to={{pathname: `/Mix/${props.forward.id}`}} style={{ textDecoration: 'none'}}>
                                <Box component="span" style={{ color: colour2TextShade}}>
                                    <div>{props.forward.artist}</div>
                                    <div>{props.forward.colourName}</div>
                                </Box>
                            </Link> 
                        </div>
                    ):(
                        <Box component="span"/>
                    )
                }
           </Grid>
        </Grid>
    );
}