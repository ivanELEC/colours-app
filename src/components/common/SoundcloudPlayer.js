import React from 'react' 

export default function SoundcloudPlayer(props) {
    /*string that stores url for mix
    colour (in hex) and mix ID are provided as props
    */
    //remove # from colour hex code
    var colourHex = props.colourHex.substring(1) 
    var srcString = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + props.embedId + "&color=%23" + colourHex + "&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true" 
    console.log(srcString) 
    return (
        <div>
            <iframe title={`scplayer-${props.embedId}`} id={`scplayer-${props.embedId}`}
                width="100%"
                height="166"
                scrolling="no"
                frameborder="no"
                allow="autoplay"
                src={srcString}>
            </iframe>
        </div>
    ) 
}

