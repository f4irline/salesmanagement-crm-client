import React from 'react';
import { Component } from 'react';
import './Leads.css';

import {print} from '../../../utils/Debug';

class Leads extends Component {
  state = {
    data: []
  }

  componentDidMount() {
    this.setState({data: this.props.data});
  }

  
  render() {

    print ('Leads', 'render');

    if (this.state.loading) {
      return (
        <div className='Leads'>
          <p>Loading...</p>
        </div>
      );
    }

    return (
      <div className='Leads'>
        <p>Leads</p>
      </div>
     
    );

  }
}

export default Leads;
