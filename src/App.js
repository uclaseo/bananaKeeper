import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { hot } from 'react-hot-loader';
import CssBaseline from '@material-ui/core/CssBaseline';

import NavigationBar from './components/NavigationBar/NavigationBar';
import Home from './containers/Home/Home';
import Buy from './containers/Buy/Buy';
import Sell from './containers/Sell/Sell';
import Analytics from './containers/Analytics/Analytics';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <CssBaseline />
        <NavigationBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/buy" component={Buy} />
          <Route path="/sell" component={Sell} />
          <Route path="/analytics" component={Analytics} />
        </Switch>
      </Router>
    );
  }
}

export default hot(module)(App);
