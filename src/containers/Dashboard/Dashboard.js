import React from 'react';
import { Component } from 'react';
import './Dashboard.css';

import Grid from '@material-ui/core/Grid';

import UserData from './UserData/UserData';
import UserGraph from './UserGraph/UserGraph';
import CompanyGraph from './CompanyGraph/CompanyGraph';

import userData from '../../placeholders/user.json';

import axios from 'axios';

import {print} from '../../utils/Debug';

class Dashboard extends Component {
  BASE_URL = 'https://vc-system-server.herokuapp.com/';

  state = {
    name: this.props.name,
    user: {},
    userData: userData,
    loading: true
  }
  
  componentDidMount() {
    print('Dashboard', 'componentDidMount');
    let url_user = `${this.BASE_URL}users/${this.state.name}`;
    axios.get(url_user)
      .then(user => this.setState({user: user.data}, () => {
        this.setState({loading: false});
      }))
      .catch(err => console.log(err));
  }

  componentWillUnmount() {
    print('Dashboard', 'componentWillUnmount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.name !== this.state.name) {
      return true;
    } else if (nextState.user !== this.state.user) {
      return true;
    } else if (nextState.userData !== this.state.userData) {
      return true;
    } else if (nextState.loading !== this.state.loading) {
      return true;
    }
    
    return false;
  }

  render() {
    print('Dashboard', 'render');
    
    if (this.state.loading) {
      print('Dashboard', 'return loading');
      return (
        <Grid container justify='center' direction='row' className='Dashboard'>
          <Grid container item justify='center' xs={12}>
            <Grid item>
              <p>Loading...</p>
            </Grid>
          </Grid>
        </Grid>
      );
    }
    print ('Dashboard', 'return');
    return (
      <Grid container justify='center' direction='row' className='Dashboard'>
        <Grid container item xs={12} className='user-wrapper'>
          <UserData user={this.state.user} userData={this.state.userData}/>
          <UserGraph sales={this.state.userData.total_sales} goal={this.state.userData.goal}/>
        </Grid>
        <Grid container item xs={12} className='company-wrapper'>
          <CompanyGraph />
        </Grid>
      </Grid>
    );
  }
}

export default Dashboard;
