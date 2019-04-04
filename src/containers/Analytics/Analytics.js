import React, { Component } from 'react';
import axios from 'axios';
import { api } from '../../../config.json';

export default class Analytics extends Component {
  test = async () => {
    const test = await axios.get(`${api}/`);
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
