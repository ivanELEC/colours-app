import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { fadeInDown } from 'react-animations';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import Radium, {StyleRoot} from 'radium';
const { getPaletteFromURL } = require('color-thief-node');

var colourPath;

const useStyles = makeStyles({
  root: {
  
  },
  statusMsg:{
    fontFamily:'HelveticaBold'
  },
  dropzone:{
    overflow:"hidden"
  }
}); 

const styles = {
  fadeInDown: {
    animation: 'x 1s',
    animationName: Radium.keyframes(fadeInDown, 'fadeInDown')
  }
};

async function getColours(url){
  const colorPallete = await getPaletteFromURL("https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80");
  return colorPallete;
}

export default function Match(props) {
  const classes = useStyles();

  const toast = (innerHTML) => {
    const el = document.getElementById('toast')
    el.innerHTML = innerHTML
    el.className = 'show'
    setTimeout(() => { el.className = el.className.replace('show', '') }, 3000)
  }

  const getUploadParams = () => {
    return { url: 'https://httpbin.org/post' }
  }

  const handleChangeStatus = ({ meta, remove }, status) => {
    if (status === 'headers_received') {
      toast(`${meta.name} uploaded!`)
      remove()
    } else if (status === 'aborted') {
      toast(`${meta.name}, upload failed...`)
    }
  }

  const handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    colourPath = files[0].previewUrl;

  }
    
  
  return (
    <StyleRoot>
      <div className={classes.statusMsg} id="toast">Upload</div>
      <Dropzone
        getUploadParams={getUploadParams}
        multiple={false}
        onSubmit={handleSubmit}
        inputContent="Drag/Drop an image or click here to find file"
        styles={{
          dropzone: { width: 400, height: 200, overflow:"hidden" },
          dropzoneActive: { borderColor: 'green' },
        }}
      />
    </StyleRoot>  
    )
  }

