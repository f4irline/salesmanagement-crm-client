import React from 'react';
import { Component } from 'react';
import './Offers.css';

import {print} from '../../../utils/Debug';

class Offers extends Component {
  state = {
    data: []
  }

  componentDidMount() {
    this.setState({data: this.props.data});
  }

  
  render() {

    print ('Offers', 'render');

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

export default Offers;
