import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import Mix from './components/pages/Mix';
import * as serviceWorker from './serviceWorker';

//load fonts
import './fonts/HelveticaNeueCyr-Bold.ttf';
import './fonts/HelveticaNeueCyr-Light.ttf';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/Mix/:id" component={Mix} />
    </div>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
