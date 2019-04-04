import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { hot } from 'react-hot-loader';

import Home from './containers/Home/Home';
import Buy from './containers/Buy/Buy';
import Sell from './containers/Sell/Sell';
import Analytics from './containers/Analytics/Analytics';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/buy" component={Buy} />
        <Route path="/sell" component={Sell} />
        <Route path="/analytics" component={Analytics} />
      </Router>
    );
  }
}

export default hot(module)(App);
