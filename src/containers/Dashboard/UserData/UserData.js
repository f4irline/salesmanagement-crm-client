import React from 'react';
import { Component } from 'react';
import './UserData.css';

import Typography from '@material-ui/core/Typography';

class UserData extends Component {
  constructor(props) {
    super(props);
    console.log('UserData constructor');
    this.state = {user: props.user};
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
      </div>
    );
  }
}

export default UserData;