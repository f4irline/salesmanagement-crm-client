import React from 'react';
import { Component } from 'react';
import './Dashboard.css';

import UserData from './UserData/UserData';

class Dashboard extends Component {
  BASE_URL = "https://vc-system-server.herokuapp.com/user/";
  constructor(props) {
    super(props);
    console.log('Dashboard constructor');
  }

  render() {
    console.log('Dashboard render');
    return (
      <div className='Dashboard'>
        <UserData name={this.props.name}/>
      </div>
    );
  }
}

export default Dashboard;
