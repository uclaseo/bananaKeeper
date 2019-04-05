import React, { Component } from 'react';
import {
  TextField,
  Button,
} from '@material-ui/core';
import axios from 'axios';

import { api } from '../../../config.json';

export default class Buy extends Component {
  state = {
    bananaCount: '',
    buyDate: '',
  };

  handleChange = type => (event) => {
    this.setState({
      [type]: event.target.value,
    });
  }

  handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const {
        bananaCount,
        buyDate,
      } = this.state;
      const response = await axios.post(`${api}/bananas`, {
        number: +bananaCount,
        buyDate,
      });
      console.log('response.data', response.data);
    } catch (error) {
      console.log('handleSubmit error: ', error);
    }
  }

  render() {
    const {
      bananaCount,
      buyDate,
    } = this.state;

    return (
      <div>
        <form className="buyForm" noValidate autoComplete="off" onSubmit={this.handleSubmit}>
          <TextField
            label="banana"
            value={bananaCount}
            onChange={this.handleChange('bananaCount')}
          />
          <TextField
            label="date"
            value={buyDate}
            onChange={this.handleChange('buyDate')}
          />
          <Button
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
};