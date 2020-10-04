import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import Mix from './components/pages/Mix';
import Match from './components/pages/Match';
import * as serviceWorker from './serviceWorker';
import Footer from './components/navigation/Footer';
//load fonts
import './fonts/HelveticaNeueCyr-Bold.ttf';
import './fonts/HelveticaNeueCyr-Light.ttf';

const routing = (
  <div>
    <Router>
      <Switch><Route exact path="/" component={App} /></Switch>
      <Switch><Route exact path="/Mix/:id" component={Mix} /></Switch>
      <Switch><Route exact path="/Match" component={Match} /></Switch>
      <Footer/>
    </Router>
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
