import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';

import {
  api,
  price,
} from '../../../config.json';

import styles from './Analytics.css';

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

    const { unexpiredBananas, expiredBananas, soldBananas } = this.filterBananas(bananas);
    const soldBananaCount = soldBananas.length;
    const remainingUnexpiredBananasValue = this.calculateValue(unexpiredBananas.length, price.banana.buyValue);
    const remainingExpiredBananasValue = this.calculateValue(expiredBananas.length, price.banana.buyValue);
    
    const totalSoldValue = this.calculateValue(soldBananaCount, price.banana.sellValue);
    const totalNetValue = this.calculateNetValue(bananas.length, soldBananaCount);

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
    const isProfit = totalNetValue > 0;
  
    return (
      <Paper
        className={styles.analyticsContainer}
        elevation={0}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{currentDate}</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>$</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow hover>
              <TableCell>Unexpired Bananas</TableCell>
              <TableCell>{unexpiredBananas.length}</TableCell>
              <TableCell><span className={styles.primaryColor}>{remainingUnexpiredBananasValue}</span></TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell>Expired Bananas</TableCell>
              <TableCell>{expiredBananas.length}</TableCell>
              <TableCell><span className={styles.secondaryColor}>{remainingExpiredBananasValue}</span></TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell>Sold Bananas</TableCell>
              <TableCell>{soldBananaCount}</TableCell>
              <TableCell><span className={styles.primaryColor}>{totalSoldValue}</span></TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell />
              <TableCell>Profit</TableCell>
              <TableCell><span className={isProfit ? styles.primaryColor : styles.secondaryColor}>{totalNetValue}</span></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    );
  }
};
