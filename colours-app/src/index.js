import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import Mix from './components/pages/Mix';
import StickyFooter from 'react-sticky-footer';
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';
import Link from '@material-ui/core/Link';
import * as serviceWorker from './serviceWorker';

//load fonts
import './fonts/HelveticaNeueCyr-Bold.ttf';
import './fonts/HelveticaNeueCyr-Light.ttf';


const routing = (
  <div>
    <Router>
      <Switch><Route exact path="/" component={App} /></Switch>
      <Switch><Route exact path="/Mix/:id" component={Mix} /></Switch>
    </Router>
    <StickyFooter
    bottomThreshold={50}
    stickyStyles={{
    backgroundColor: "rgba(255,255,255,.8)",
    width:"100%"
    }}
    onFooterStateChange={false}
  >
  <Grid
    container
    direction="row"
    justify="space-between"
    alignItems="center"
    >
    <Grid item xs={6} md={3}>
      <div style={{fontFamily:'HelveticaBold'}}>[Insert Name of Project] </div> <div style={{fontFamily:'HelveticaLight'}}>Akash Chonan + Ivan Yohuno, Est. 2020</div>
    </Grid>
    <Grid item xs={3} md={8}/>
    <Grid item xs={3} md={1}
    container
    direction="row"
    justify="space-between"
    alignItems="center"
    >
    <Grid item xs={6}/>
    <Grid item xs={6}>
    <a style={{color:"#000000",maxHeight:"70px"}} href="mailto:ivan_yohuno@hotmail.co.uk" target="_top">
      <SendIcon/>
    </a>
    </Grid>
    </Grid> 
  </Grid>
  </StickyFooter>
</div>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
