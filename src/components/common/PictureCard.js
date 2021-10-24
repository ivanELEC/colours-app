import React from 'react';
import Card from './Card';
import { makeStyles } from '@material-ui/core/styles';

/*
A simple card with an image, a title and some content
*/
const useStyles = makeStyles({
    root: {
        minWidth: 230,
        minHeight: 480,
        maxWidth: 400,
        fontFamily: 'HelveticaLight',
        'font-size': 16, 
        borderRadius:4
    },
    media: {
        minHeight: 300,
        backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/colours-project.appspot.com/o/images%2FmixImages%2Fmoss.jpg?alt=media&token=5fb0fd1d-d746-41e9-9358-8363bca2d2d4")`,
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

export default function PictureCard(props) {
    const classes = useStyles(props);

    return (
        <div className={classes.root}>
            <Card>
                <div className={classes.media} />
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