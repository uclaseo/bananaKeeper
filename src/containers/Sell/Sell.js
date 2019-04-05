import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import {
  TextField,
  Button,
  Paper,
} from '@material-ui/core';

import {
  api,
  items,
} from '../../../config.json';
import styles from './Sell.css';

export default class Buy extends Component {
  state = {
    unsoldBananas: [],
    bananaCount: '',
    sellDate: '',
    validations: {
      bananaCountErrorMessage: '',
      sellDateErrorMessage: '',
      inputErrorMessage: '',
    },
    submitMessage: '',
  };

  async componentDidMount() {
    await this.fetchBananas();
  }

  fetchBananas = async () => {
    const response = await axios.get(`${api}/bananas`);
    const unsoldBananas = response.data.filter(banana => banana.sellDate === null);
    this.setState({
      unsoldBananas,
    });
  }

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
        sellDate,
      } = this.state;

      const isValidated = this.validateFields();
      if (isValidated) {
        const response = await axios.put(`${api}/bananas`, {
          number: +bananaCount,
          sellDate,
        });
        this.setState({
          submitMessage: `${response.data.length} bananas sold on ${response.data[0].sellDate} added successfully`,
        }, () => {
          this.fetchBananas();
        });
      }
    } catch (error) {
      console.error('Sell.js - handleSubmit error: ', error);
    }
  }

  validateFields = () => {
    const {
      unsoldBananas,
      bananaCount,
      sellDate,
    } = this.state;
    let bananaCountErrorMessage = '';
    let sellDateErrorMessage = '';
    let inputErrorMessage = '';

    const goodBananas = this.filterGoodBananas(unsoldBananas);
    const goodBananasCount = goodBananas.length;
    const hasEnoughBananas = Boolean(bananaCount <= goodBananasCount);
    if (!bananaCount || !sellDate) {
      inputErrorMessage = 'Please enter all required fields';
    }
    if (!hasEnoughBananas) {
      bananaCountErrorMessage = 'Not enough bananas left';
    }
    if (!Number(bananaCount)) {
      bananaCountErrorMessage = 'Please enter valid number';
    }
    if (!moment(sellDate, 'YYYY-MM-DD', true).isValid()) {
      sellDateErrorMessage = 'Date should be in the form of YYYY-MM-DD';
    }
    const hasValidationErrors = Boolean(
      bananaCountErrorMessage ||
      sellDateErrorMessage ||
      inputErrorMessage
    )
    this.setState({
      validations: {
        bananaCountErrorMessage,
        sellDateErrorMessage,
        inputErrorMessage,
      },
      submitMessage: '',
    });
    if (hasValidationErrors) {
      return false;
    }
    return true;
  }

  calculateExpiringDate = (buyDate) => {
    const purchasedDate = moment(buyDate);
    const expiringDate = purchasedDate.add(items.banana.expireDays, 'day');
    return expiringDate;
  }

  filterGoodBananas = (bananas) => {
    const { sellDate } = this.state;
    const goodBananas = bananas.filter((banana) => {
      const { buyDate } = banana;
      const expiringDate = this.calculateExpiringDate(buyDate);
      const isGoodBanana = moment(sellDate).isBefore(expiringDate);
      return isGoodBanana;
    });
    return goodBananas;
  }

  render() {
    const {
      bananaCount,
      sellDate,
      validations: {
        bananaCountErrorMessage,
        sellDateErrorMessage,
        inputErrorMessage,
      },
      submitMessage,
    } = this.state;

    return (
      <Paper
        className={styles.sellContainer}
        elevation={0}
      >
        <div className={styles.input}>
          <TextField
            label="Banana"
            value={bananaCount}
            onChange={this.handleChange('bananaCount')}
            variant="outlined"
            fullWidth
            placeholder="Enter number of bananas"
            error={!!bananaCountErrorMessage}
            helperText={bananaCountErrorMessage}
          />
        </div>
        <div className={styles.input}>
          <TextField
            label="Sold Date"
            value={sellDate}
            onChange={this.handleChange('sellDate')}
            variant="outlined"
            fullWidth
            placeholder="YYYY-MM-DD"
            error={!!sellDateErrorMessage}
            helperText={sellDateErrorMessage}
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
          <div className={styles.submitMessage}>
            {submitMessage}
          </div>
        </div>
      </Paper>
    );
  }
};