import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './Home.css';

export default class Home extends Component {
  render() {
    return (
      <div className={styles.homeContainer}>
        Welcome to Banana Keeper!
      </div>
    );
  }
};