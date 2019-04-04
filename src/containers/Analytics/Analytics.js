import React, { Component } from 'react';
import axios from 'axios';

export default class Analytics extends Component {
  test = async () => {
    const test = await axios.get('http://localhost:8080/api/bananas');
    console.log('test', test);
  }
  render() {
    return (
      <div>
        Analytics
        <button onClick={this.test}>
          test
        </button>
      </div>
    );
  }
};