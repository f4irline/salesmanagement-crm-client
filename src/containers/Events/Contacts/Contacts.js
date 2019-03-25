import React from 'react';
import { Component } from 'react';
import './Contacts.css';

import {print} from '../../../utils/Debug';

class Contacts extends Component {
  state = {
    data: []
  }

  componentDidMount() {
    this.setState({data: this.props.data});
  }

  
  render() {

    print ('Contacts', 'render');

    if (this.state.loading) {
      return (
        <div className='Contacts'>
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

export default Contacts;
