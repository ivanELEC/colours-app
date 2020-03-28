import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Link';
import Hidden from '@material-ui/core/Hidden';
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

export default function MixNavBar() {
    const classes = useStyles();

    //get text shades for navigation buttons
    var colour1Obj = tinycolor(colour1);
    var colour2Obj = tinycolor(colour2);
    var colour1Shade = getTextShade(colour1Obj);
    var colour2Shade = getTextShade(colour1Obj);

    return ( 
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
           <Grid item xs={4} style={{ background: colour1}}>
                <Link to={{pathname: `/Mix/Akash-Cobalt`}} style={{ textDecoration: 'none'}}>
                    <Box component="span" style={{ color: colour1Shade}}>
                        <div>Colour</div>
                        <div>Akash</div>
                    </Box>
                </Link>
           </Grid>
           <Grid item xs={4}/>
           <Grid item xs={4} style={{ background: colour2}}>
                <Link to={{pathname: `/Mix/Akash-Cerulean`}} style={{ textDecoration: 'none'}}>
                    <Box component="span" style={{ color: colour2Shade}}>
                        <div>Colour</div>
                        <div>Akash</div>
                    </Box> 
                </Link>
           </Grid>
        </Grid>
    );
}