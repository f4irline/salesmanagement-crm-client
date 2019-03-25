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
        <div className='Events'>
          <p>Loading...</p>
        </div>
      );
    }

    return (
      <div className='Events'>

      </div>
     
    );

  }
}

export default Leads;
