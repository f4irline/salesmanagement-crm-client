import React from 'react';
import { Component } from 'react';
import './Dashboard.css';

import UserData from './UserData/UserData';
import UserGraph from './UserGraph/UserGraph';
import CompanyGraph from './CompanyGraph/CompanyGraph';

import userdata from '../../placeholders/user.json';

class Dashboard extends Component {
  BASE_URL = 'https://vc-system-server.herokuapp.com/user/';
  constructor(props) {
    super(props);
    console.log('Dashboard constructor');
    console.log(userdata.hit_rate);
  }

  render() {
    console.log('Dashboard render');
    return (
      <div className='Dashboard'>
        <div className='user-wrapper'>
          <UserData name={this.props.name}/>
          <UserGraph />
        </div>
        <div className='company-wrapper'>
          <CompanyGraph />
        </div>
      </div>
    );
  }
}

export default Dashboard;
