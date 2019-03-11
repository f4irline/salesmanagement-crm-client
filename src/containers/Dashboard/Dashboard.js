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
    
    let user = {};
    this.state = {name: props.name, user: user};
  }
  
  componentDidMount() {
    let url = `${this.BASE_URL}${this.state.name}`;
    console.log(url);
    fetch(url).then(
      (resp) => resp.json()).then((user) => {
      console.log(user);
      let stateObj = {user: user};
      this.setState(stateObj);
    }).catch((e) => console.log(e));
  }

  render() {
    console.log('Dashboard render');
    return (
      <div className='Dashboard'>
        <div className='user-wrapper'>
          <UserData user={this.state.user} />
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
