import React from 'react';
import { Component } from 'react';
import './Meetings.css';

import {print} from '../../../utils/Debug';

class Meetings extends Component {
  state = {
    data: []
  }

  componentDidMount() {
    this.setState({data: this.props.data});
  }

  
  render() {

    print ('Meetings', 'render');

    if (this.state.loading) {
      return (
        <div className='Meetings'>
          <p>Loading...</p>
        </div>
      );
    }

    return (
      <div className='Meetings'>
        <p>Meetings</p>
      </div>
     
    );

  }
}

export default Meetings;
