import React from 'react';
import { Component } from 'react';

import Grid from '@material-ui/core/Grid';

import './UserGraph.css';

class UserGraph extends Component {
  constructor(props) {
    super(props);
    console.log('UserData constructor');
    let user = {};
    this.state = {name: props.name, user: user};
  }

  render() {
    console.log('UserData render');
    return (
      <Grid item xs={12} lg={6} className='UserGraph'>
        <p>Usergraph</p>
      </Grid>
    );
  }
}

export default UserGraph;