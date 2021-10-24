import React from 'react';
import Card from './Card';
import { makeStyles } from '@material-ui/core/styles';

/*
A simple card with an image, a title and some content
*/
export default function PictureCard(props) {
    const useStyles =  makeStyles({
        root: {
            minWidth: 230,
            minHeight: 480,
            maxWidth: 400,
            fontFamily: 'HelveticaLight',
            'font-size': 16,
            borderRadius: 4
        },
        mediaContainer:{
            position:"relative"
        },
        
        media: {
            minHeight: 300,
            backgroundImage: `url("${props.image}")`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
        },
        content: {
            background: '#ffffff',
            padding: 3,
            margin: 3,
        },
        title: {
            fontFamily: 'HelveticaBold',
            'font-size': 25,
            margin: 3,
        }
    });

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Card>
                <div className={classes.mediaContainer}>
                    <div className={classes.media} />
                </div>
                <div className={classes.content}>
                    <div className={classes.title}>
                        {props.title}
                    </div>
                    <p>{props.colourName}</p>
                    <p>{props.colourHex}</p>
                    <p>{props.date}</p>
                </div>
            </Card>
        </div>
    );
}