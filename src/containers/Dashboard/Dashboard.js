import React from 'react';
import { Component } from 'react';
import './Dashboard.css';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import UserData from './UserData/UserData';
import UserGraph from './UserGraph/UserGraph';
import CompanyGraph from './CompanyGraph/CompanyGraph';


import axios from '../../axios-options';

import {print} from '../../utils/Debug';

class Dashboard extends Component {
  state = {
    user_id: this.props.user_id,
    user: {},
    userData: {},
    loading: true,
    loading2: true
  }
  
  componentDidMount() {
    print('Dashboard', 'componentDidMount');
    let url_user = `/users/${this.state.user_id}`;
    let url_userData = `/userData/${this.state.user_id}`;
    axios.get(url_user)
      .then(user => this.setState({user: user.data}, () => {
        this.setState({loading: false});
      }))
      .catch(err => console.log(err));

    axios.get(url_userData)
      .then(userData => this.setState({userData: userData.data}, () => {
        this.setState({loading2: false});
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
    } else if (nextState.loading2 !== this.state.loading2) {
      return true;
    }
    
    return false;
  }

  render() {
    print('Dashboard', 'render');
    
    if (this.state.loading || this.state.loading2) {
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
      <Grid container justify='space-between' direction='row' className='Dashboard'>
        <Grid container justify='space-around' item className='user-wrapper'>
          <UserData user={this.state.user} userData={this.state.userData}/>
          <UserGraph sales={this.state.userData.total_sales} goal={this.state.user.goal}/>
        </Grid>
        <Divider variant='middle' />
        <Grid container justify='space-around' item className='company-wrapper'>
          <CompanyGraph />
        </Grid>
      </Grid>
    );
  }
}

export default Dashboard;
