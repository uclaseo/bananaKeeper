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
  items,
} from '../../../config.json';
import styles from './Analytics.css';

export default class Analytics extends Component {
  state = {
    currentDate: moment().format('YYYY-MM-DD'),
    badBananas: [],
    goodBananas: [],
    remainingGoodBananasValue: '0.00',
    remainingBadBananasValue: '0.00',
    soldBananasCount: '0.00',
    totalSoldValue: '0.00',
    totalNetValue: '0.00',
  };

  componentDidMount() {
    this.initializeData();
  }

  initializeData = async () => {
    const bananas = await this.fetchBananas();
    const {
      banana: {
        buyValue,
        sellValue,
      },
    } = items;

    const {
      badBananas,
      goodBananas,
      soldBananas,
    } = this.filterBananas(bananas);

    const goodBananasCount = goodBananas.length;
    const badBananasCount = badBananas.length;
    const soldBananasCount = soldBananas.length;
    const totalBananasCount = bananas.length;

    const remainingGoodBananasValue = this.calculateValue(goodBananasCount, sellValue);
    const remainingBadBananasValue = this.calculateValue(badBananasCount, buyValue);
    const totalSoldValue = this.calculateValue(soldBananasCount, sellValue);
    const totalNetValue = this.calculateNetValue(totalBananasCount, soldBananasCount);

    this.setState({
      badBananas,
      goodBananas,
      remainingGoodBananasValue,
      remainingBadBananasValue,
      soldBananasCount,
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
    const today = moment(currentDate);

    const badBananas = [];
    const goodBananas = [];
    const soldBananas = [];
    bananas.forEach((banana) => {
      if (banana.sellDate) {
        return soldBananas.push(banana);
      }
      const expiringDate = this.calculateExpiringDate(banana.buyDate);
      const isBananaExpired = today.isAfter(expiringDate);
      if (isBananaExpired) {
        return badBananas.push(banana);
      }
      return goodBananas.push(banana);
    });
    return {
      badBananas,
      goodBananas,
      soldBananas,
    };
  }

  calculateExpiringDate = (buyDate) => {
    const purchasedDate = moment(buyDate);
    const expiringDate = purchasedDate.add(items.banana.expireDays, 'day');
    return expiringDate;
  }

  calculateValue = (number, value) => {
    return (number * value).toFixed(2);
  }

  calculateNetValue = (totalCount, soldCount) => {
    const {
      banana: {
        buyValue,
        sellValue,
      },
    } = items;
    return (soldCount * sellValue - totalCount * buyValue).toFixed(2);
  }

  render() {
    const {
      currentDate,
      badBananas,
      goodBananas,
      remainingGoodBananasValue,
      remainingBadBananasValue,
      soldBananasCount,
      totalSoldValue,
      totalNetValue,
    } = this.state;
    const isProfit = totalNetValue >= 0;
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
              <TableCell>{goodBananas.length}</TableCell>
              <TableCell>
                <span className={styles.primaryColor}>
                  {remainingGoodBananasValue}
                </span>
              </TableCell>
            </TableRow>

            <TableRow hover>
              <TableCell>Expired Bananas</TableCell>
              <TableCell>{badBananas.length}</TableCell>
              <TableCell>
                <span className={styles.secondaryColor}>
                  {remainingBadBananasValue}
                </span>
              </TableCell>
            </TableRow>

            <TableRow hover>
              <TableCell>Sold Bananas</TableCell>
              <TableCell>{soldBananasCount}</TableCell>
              <TableCell>
                <span className={styles.primaryColor}>
                  {totalSoldValue}
                </span>
              </TableCell>
            </TableRow>

            <TableRow hover>
              <TableCell />
              <TableCell>Profit</TableCell>
              <TableCell>
                <span className={isProfit ? styles.primaryColor : styles.secondaryColor}>
                  {totalNetValue === '-0.00' ? '0.00' : totalNetValue}
                </span>
              </TableCell>
            </TableRow>
          </TableBody>

        </Table>
      </Paper>
    );
  }
}
