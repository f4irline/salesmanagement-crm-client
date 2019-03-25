import React from 'react';
import { Component } from 'react';
import './Sales.css';

import {print} from '../../../utils/Debug';

class Sales extends Component {
  state = {
    data: []
  }

  componentDidMount() {
    this.setState({data: this.props.data});
  }


  
  render() {

    print ('Sales', 'render');

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

export default Sales;
