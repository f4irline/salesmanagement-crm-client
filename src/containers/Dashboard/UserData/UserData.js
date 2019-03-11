import React from 'react';
import { Component } from 'react';
import './UserData.css';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { List, ListItemText, ListItem } from '@material-ui/core';

class UserData extends Component {
  constructor(props) {
    super(props);
    console.log('UserData constructor');

    this.state = {user: props.user, name: props.name, userData: props.userData};
  }

  render() {
    console.log('UserData render');
    return (
      <div className='UserData'>
        <Typography variant="h2">
          Hello, {this.state.user.name}
        </Typography>
        <Typography variant="h5" gutterBottom>
            your last login: {this.state.user.lastLogin}
        </Typography>
        <Paper>
          <div>
            <List>
              <ListItem>
                <ListItemText primary={`Hitrate: ${this.state.userData.hit_rate}`}></ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText primary={`Average sales: ${this.state.userData.avg_sales}`}></ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText primary={`Total sales: ${this.state.userData.total_sales}`}></ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText primary={`Contacts amount: ${this.state.userData.contacts_amount}`}></ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText primary={`Meetings amount: ${this.state.userData.meetings_amount}`}></ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText primary={`Offers amount: ${this.state.userData.offers_amount}`}></ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText primary={`Deals amount: ${this.state.userData.deals_amount}`}></ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText primary={`Goal: ${this.state.userData.goal}`}></ListItemText>
              </ListItem>
            </List>
          </div>

        </Paper>
      </div>
    );
  }
}

export default UserData;