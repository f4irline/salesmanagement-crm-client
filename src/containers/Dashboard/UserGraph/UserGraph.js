import React from 'react';
import { Component } from 'react';

import Grid from '@material-ui/core/Grid';

import './UserGraph.css';

class UserGraph extends Component {
  constructor(props) {
    super(props);
    console.log('UserData constructor');
    this.state = {user: props.user, name: props.name, userData: props.userData};
  }

  render() {
    console.log('UserData render');
    return (
      <Grid item xs={12} lg={6} className='UserGraph' style={{minHeight: '100%'}}>
        <p>Usergraph</p>
      </Grid>
    );
  }
}

export default UserGraph;