import React from 'react';
import { Component } from 'react';
import './CompanyGraph.css';

import Grid from '@material-ui/core/Grid';

class CompanyGraph extends Component {
  constructor(props) {
    super(props);
    console.log('UserData constructor');
    let user = {};
    this.state = {name: props.name, user: user};
  }

  render() {
    console.log('UserData render');
    return (
      <Grid item xs={12} className='CompanyGraph'>
        <p>CompanyGraph</p>
      </Grid>
    );
  }
}

export default CompanyGraph;