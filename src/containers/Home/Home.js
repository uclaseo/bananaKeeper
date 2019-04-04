import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
      <div>
        Home
        <Link to='buy'>buy</Link>
        <Link to='sell'>sell</Link>
        <Link to='analytics'>analytics</Link>
      </div>
    );
  }
};