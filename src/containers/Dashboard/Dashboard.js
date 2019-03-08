import React from 'react';
import { Component } from 'react';
import './Dashboard.css';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    console.log('Dashboard constructor');
  }

  render() {
    console.log('Dashboard render');
    return (
      <div className='Dashboard'>
      hellurei
      </div>
    );
  }
}

export default Dashboard;
