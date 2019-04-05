import React, { Component } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
} from '@material-ui/core';
import { api } from '../../../config.json';
import styles from './Buy.css';

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
      console.error('handleSubmit error: ', error);
    }
  }

  render() {
    const {
      bananaCount,
      buyDate,
    } = this.state;
    return (
      <div className={styles.formContainer}>
        <div className={styles.input}>
          <TextField
            label="banana"
            value={bananaCount}
            onChange={this.handleChange('bananaCount')}
            variant="outlined"
            fullWidth
            placeholder="Enter number of banana"
          />
        </div>
        <div className={styles.input}>
          <TextField
            label="date"
            value={buyDate}
            onChange={this.handleChange('buyDate')}
            variant="outlined"
            fullWidth
            placeholder="YYYY-MM-DD"
          />
        </div>
        <div className={styles.input}>
          <Button
            type="submit"
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }
}
