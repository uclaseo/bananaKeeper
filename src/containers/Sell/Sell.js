import React, { Component } from 'react';
import {
  TextField,
  Button,
} from '@material-ui/core';
import axios from 'axios';
import moment from 'moment';
import { api } from '../../../config.json';
import styles from './Sell.css';

const tenDays = 864000000;

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
  };

  async componentDidMount() {
    const response = await axios.get(`${api}/bananas`);
    // console.log('response.data', response.data);
    const unsoldBananas = response.data.filter(banana => banana.sellDate === null);
    // console.log('unsold bananas', unsoldBananas);
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
    event.preventDefault();
    const {
      unsoldBananas,
      bananaCount,
      sellDate,
    } = this.state;
    const isValidated = this.validateFields();
    if (isValidated) {
      const response = await axios.put(`${api}/bananas`, {
        number: +bananaCount,
        sellDate,
      });
      console.log('response.data', response.data);
    } else {

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
    const unexpiredBananas = this.filterGoodBananas(unsoldBananas);
    const unexpiredBananasCount = unexpiredBananas.length;
    const hasEnoughBananas = Boolean(bananaCount <= unexpiredBananasCount);
    if (!bananaCount || !sellDate) {
      inputErrorMessage = 'Please enter all required fields';
    }
    if (!hasEnoughBananas) {
      bananaCountErrorMessage = 'Not enough bananas left';
    }
    if (!Number(bananaCount)) {
      bananaCountErrorMessage = 'Please enter valid number';
    }
    if (!moment(sellDate).isValid()) {
      sellDateErrorMessage = 'Date should be in the form of YYYY-MM-DD';
    }
    if (bananaCountErrorMessage || sellDateErrorMessage || inputErrorMessage) {
      this.setState({
        validations: {
          bananaCountErrorMessage,
          sellDateErrorMessage,
          inputErrorMessage,
        },
      });
      return false;
    }
    return true;

  }

  convertDateToUTC = (date) => {
    const dateArray = date.split('-');
    const year = +dateArray[0];
    const month = +dateArray[1] - 1;
    const day = +dateArray[2];
    return Date.UTC(year, month, day);
  }

  calculateExpiringDateInUTC = (date) => {
    const dateInUTC = this.convertDateToUTC(date);
    return new Date(dateInUTC + tenDays);
  };

  filterGoodBananas = (bananas) => {
    const { sellDate } = this.state;
    const goodBananas = bananas.filter((banana) => {
      const { buyDate } = banana;
      const expiringDateInUTC = this.calculateExpiringDateInUTC(buyDate);
      const sellingDateInUTC = this.convertDateToUTC(sellDate);
      if (expiringDateInUTC > sellingDateInUTC) {
        return banana;
      }
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
      }
    } = this.state;

    return (
      <div className={styles.formContainer}>
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

        </div>
      </div>
    );
  }
};