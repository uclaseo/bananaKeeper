import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NavigationBar extends Component {
  render() {
    return (
      <div>
        <Link to='buy'>buy</Link>
        <Link to='sell'>sell</Link>
        <Link to='analytics'>analytics</Link>
      </div>
    );
  }
};