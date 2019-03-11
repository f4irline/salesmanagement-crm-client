import React from 'react';
import { Component } from 'react';
import './UserData.css';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

class UserData extends Component {
  constructor(props) {
    super(props);
    console.log('UserData constructor');

    console.log(props.name);
    this.state = {user: props.user, name: props.name};
  }

  render() {
    console.log('UserData render');
    return (
      <div className='UserData'>
        <Typography variant="h2">
          hellurei {this.state.user.name}
        </Typography>
        <Typography variant="h3" gutterBottom>
            lastLogin: {this.state.user.lastLogin}
        </Typography>
        <Paper>
          <Typography variant="h5">
            UserName: {this.state.user.name} 
          </Typography>
        </Paper>
      </div>
    );
  }
}

export default UserData;