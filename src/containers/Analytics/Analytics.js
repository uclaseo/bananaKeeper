import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import {
  api,
  price,
} from '../../../config.json';

export default class Analytics extends Component {
  state = {
    currentDate: moment().format('YYYY-MM-DD'),
    bananas: [],
    unexpiredBananas: [],
    expiredBananas: [],
    remainingUnexpiredBananasValue: 0,
    remainingExpiredBananasValue: 0,
    soldBananaCount: 0,
    totalSoldValue: 0,
    totalNetValue: 0,
  };

  async componentDidMount() {
    const bananas = await this.fetchBananas();
    console.log('bananas', bananas);

    const { unexpiredBananas, expiredBananas, soldBananas } = this.filterBananas(bananas);
    const soldBananaCount = soldBananas.length;
    const remainingUnexpiredBananasValue = this.calculateValue(unexpiredBananas.length, price.banana.buyValue);
    const remainingExpiredBananasValue = this.calculateValue(expiredBananas.length, price.banana.buyValue);
    
    const totalSoldValue = this.calculateValue(soldBananaCount, price.banana.sellValue);
    const totalNetValue = this.calculateNetValue(bananas.length, soldBananaCount);
    console.log('unexpired', unexpiredBananas);
    console.log('expired', expiredBananas);
    console.log('remainingUnexpiredBananasValue', remainingUnexpiredBananasValue);
    console.log('remainingExpiredBananasValue', remainingExpiredBananasValue);
    console.log('soldBananaCount', soldBananaCount);
    console.log('totalSoldValue', totalSoldValue);
    console.log('totalNetValue', totalNetValue);
    this.setState({
      bananas,
      unexpiredBananas,
      expiredBananas,
      remainingUnexpiredBananasValue,
      remainingExpiredBananasValue,
      soldBananaCount,
      totalSoldValue,
      totalNetValue,
    });
  }

  fetchBananas = async () => {
    const response = await axios.get(`${api}/bananas`);
    const { data: bananas } = response;
    return bananas;
  }

  filterBananas = (bananas) => {
    const { currentDate } = this.state;
    const unexpiredBananas = [];
    const expiredBananas = [];
    const soldBananas = [];
    bananas.forEach((banana) => {
      if (banana.sellDate) {
        soldBananas.push(banana);
      }
      const today = moment(currentDate);
      const expiringDate = this.calculateExpiringDate(banana.buyDate);
      const isBananaExpired = Boolean(today.isAfter(expiringDate));
      if (isBananaExpired) {
        return expiredBananas.push(banana);
      }
      return unexpiredBananas.push(banana);
    });
    return {
      unexpiredBananas,
      expiredBananas,
      soldBananas,
    };
  }

  calculateExpiringDate = (buyDate) => {
    const purchasedDate = moment(buyDate);
    const expiringDate = purchasedDate.add(10, 'day');
    return expiringDate;
  }
  
  calculateValue = (number, value) => {
    console.log('number', number)
    console.log('value', value);
    return (number * value).toFixed(2);
  }

  calculateNetValue = (totalCount, soldCount) => {
    return (soldCount * 0.35 - totalCount * 0.20).toFixed(2);
  }

  render() {
    const {
      currentDate,
      unexpiredBananas,
      expiredBananas,
      remainingUnexpiredBananasValue,
      remainingExpiredBananasValue,
      soldBananaCount,
      totalSoldValue,
      totalNetValue,
    } = this.state;
  
    return (
      <div>
        <div>
          Today:
          {currentDate}
        </div>

        <div>
          <div>
            # of remaining unexpired:
            {unexpiredBananas.length}
          </div>
          <div>
            Total Values:
            {remainingUnexpiredBananasValue}
          </div>
        </div>

        <div>
          <div>
            # of expired bananas:
            {expiredBananas.length}
          </div>
          <div>
            Total Values Wasted:
            {remainingExpiredBananasValue}
          </div>
        </div>

        <div>
          <div>
            # of sold bananas:
            {soldBananaCount}
          </div>
          <div>
            Total Values Earned:
            {totalSoldValue}
          </div>
        </div>

        <div>
          <div>
            Net Profit / Loss:
            {totalNetValue}
          </div>
        </div>

        <div>
          Table
        </div>
      </div>
    );
  }
};
