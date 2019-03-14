import React from 'react';
import { Component } from 'react';
import './CompanyGraph.css';

import Grid from '@material-ui/core/Grid';

import {print} from '../../../utils/Debug';

class CompanyGraph extends Component {
  state = {
    name: this.props.name,
    user: {}
  }

  render() {
    print('CompanyGraph', 'render');
    return (
      <Grid item xs={10} className='CompanyGraph' style={{minHeight: '46vh'}}>
        <p>CompanyGraph</p>
      </Grid>
    );
  }
}

export default CompanyGraph;