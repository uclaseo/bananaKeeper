import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import {
  TextField,
  Button,
  Paper,
} from '@material-ui/core';
import { api } from '../../../config.json';
import styles from './Buy.css';

export default class Buy extends Component {
  state = {
    bananaCount: '',
    buyDate: '',
    validations: {
      bananaCountErrorMessage: '',
      buyDateErrorMessage: '',
      inputErrorMessage: '',
    },
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
      const isValidated = this.validateFields();
      console.log('isValidated', isValidated);
      if (isValidated) {
        const response = await axios.post(`${api}/bananas`, {
          number: +bananaCount,
          buyDate,
        });
        console.log('response.data', response.data);
      }
    } catch (error) {
      console.error('handleSubmit error: ', error);
    }
  }

  validateFields = () => {
    const { bananaCount, buyDate } = this.state;
    let bananaCountErrorMessage = '';
    let buyDateErrorMessage = '';
    let inputErrorMessage = '';
    if (!bananaCount || !buyDate) {
      inputErrorMessage = 'Please enter all required fields';
    }
    if (bananaCount < 1 || bananaCount > 50) {
      bananaCountErrorMessage = 'Order must be 1 - 50';
    }
    if (!Number(bananaCount)) {
      bananaCountErrorMessage = 'Please enter valid number';
    }
    if (!moment(buyDate).isValid()) {
      buyDateErrorMessage = 'Date should be in the form of YYYY-MM-DD';
    }
    if (bananaCountErrorMessage || buyDateErrorMessage || inputErrorMessage) {
      this.setState({
        validations: {
          bananaCountErrorMessage,
          buyDateErrorMessage,
          inputErrorMessage,
        },
      });
      return false;
    }
    return true;
  }

  render() {
    const {
      bananaCount,
      buyDate,
      validations: {
        bananaCountErrorMessage,
        buyDateErrorMessage,
        inputErrorMessage,
      },
    } = this.state;
    return (
      <Paper
        className={styles.buyContainer}
        elevation={0}
      >
        <div className={styles.input}>
          <TextField
            label="Banana"
            value={bananaCount}
            onChange={this.handleChange('bananaCount')}
            variant="outlined"
            fullWidth
            placeholder="Enter the number of bananas"
            error={!!bananaCountErrorMessage}
            helperText={bananaCountErrorMessage}
          />
        </div>
        <div className={styles.input}>
          <TextField
            label="Purchased Date"
            value={buyDate}
            onChange={this.handleChange('buyDate')}
            variant="outlined"
            fullWidth
            placeholder="YYYY-MM-DD"
            error={!!buyDateErrorMessage}
            helperText={buyDateErrorMessage}
          />
        </div>
        <div className={styles.input}>
          <div className={styles.errorMessage}>
            {inputErrorMessage}
          </div>
          <div className={styles.submitButton}>
            <Button
              type="submit"
              color="primary"
              variant="outlined"
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </div>

        </div>
      </Paper>
    );
  }
}
