import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import Mix from './components/pages/Mix';
import ColourDifference from './components/pages/ColourDifference';
import Footer from './components/navigation/Footer';
//load fonts
import "./fonts/HelveticaNeueCyr-Bold.ttf"
import "./fonts/HelveticaNeueCyr-Light.ttf"

const routing = (
  <div>
    <Router>
      <Switch><Route exact path="/" component={App} /></Switch>
      <Switch><Route exact path="/Mix/:id" component={Mix} /></Switch>
      <Switch><Route exact path="/ColourDifference" component={ColourDifference} /></Switch>
      <Footer/>
    </Router>
</div>
)

ReactDOM.render(routing, document.getElementById("root"))
