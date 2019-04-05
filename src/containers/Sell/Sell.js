import React, { Component } from 'react';
import {
  TextField,
  Button,
} from '@material-ui/core';
import axios from 'axios';
import { api } from '../../../config.json';
import styles from './Sell.css';

const tenDays = 864000000;

export default class Buy extends Component {
  state = {
    unsoldBananas: [],
    bananaCount: '',
    sellDate: '',
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
    const goodBananas = this.filterGoodBananas(unsoldBananas);
    const goodBananasCount = goodBananas.length;
    const hasEnoughBananas = Boolean(bananaCount <= goodBananasCount);
    if (hasEnoughBananas) {
      const response = await axios.put(`${api}/bananas`, {
        number: +bananaCount,
        sellDate,
      });
      console.log('response.data', response.data);
    }
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
    } = this.state;

    return (
      <div className={styles.container}>
        <form className="buyForm" noValidate autoComplete="off" onSubmit={this.handleSubmit}>
          <TextField
            label="banana"
            value={bananaCount}
            onChange={this.handleChange('bananaCount')}
          />
          <TextField
            label="date"
            value={sellDate}
            onChange={this.handleChange('sellDate')}
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