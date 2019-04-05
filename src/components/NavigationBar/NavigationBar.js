import React, { PureComponent, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core';

import {
  Home,
  AddCircle,
  RemoveCircle,
  Assessment,
  Menu,
} from '@material-ui/icons';

export default class NavigationBar extends PureComponent {
  state = {
    isOpen: false,
  };

  toggleDrawer = () => {
    this.setState((state) => {
      return {
        isOpen: !state.isOpen,
      };
    });
  }

  renderMenu = () => {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={this.toggleDrawer}
        onKeyDown={this.toggleDrawer}
        style={{
          width: 250,
        }}
      >

        <Link to="/" style={{ textDecoration: 'none' }}>
          <List>
            <ListItem
              button
            >
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </List>
        </Link>

        <Divider />

        <Link to="buy" style={{ textDecoration: 'none' }}>
          <List>
            <ListItem
              button
            >
              <ListItemIcon>
                <AddCircle />
              </ListItemIcon>
              <ListItemText primary="Buy" />
            </ListItem>
          </List>
        </Link>

        <Link to="sell" style={{ textDecoration: 'none' }}>
          <List>
            <ListItem
              button
            >
              <ListItemIcon>
                <RemoveCircle />
              </ListItemIcon>
              <ListItemText primary="Sell" />
            </ListItem>
          </List>
        </Link>

        <Link to="analytics" style={{ textDecoration: 'none' }}>
          <List>
            <ListItem
              button
            >
              <ListItemIcon>
                <Assessment />
              </ListItemIcon>
              <ListItemText primary="Analytics" />
            </ListItem>
          </List>
        </Link>

      </div>
    );
  }

  render() {
    const { isOpen } = this.state;
    return (
      <Fragment>

        <AppBar
          position="static"
          color="primary"
        >
          <Toolbar>
            <IconButton
              onClick={this.toggleDrawer}
              color="inherit"
              aria-label="Menu"
            >
              <Menu />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer
          open={isOpen}
          onClose={this.toggleDrawer}
        >
          {this.renderMenu()}
        </Drawer>

      </Fragment>
    );
  }
}
