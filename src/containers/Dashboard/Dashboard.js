import React from 'react';
import { Component } from 'react';
import './Dashboard.css';

import Grid from '@material-ui/core/Grid';

import UserData from './UserData/UserData';
import UserGraph from './UserGraph/UserGraph';
import CompanyGraph from './CompanyGraph/CompanyGraph';

import userData from '../../placeholders/user.json';

class Dashboard extends Component {
  BASE_URL = 'https://vc-system-server.herokuapp.com/';
  constructor(props) {
    super(props);
    console.log('Dashboard constructor');
    
    let user = {};
    this.state = {name: props.name, user: user, userData: userData, loading: true};
  }
  
  componentDidMount() {
    let url_user = `${this.BASE_URL}user/${this.state.name}`;
    console.log(url_user);
    fetch(url_user).then(
      (resp) => resp.json()).then((user) => {
      console.log(user);
      this.setState({user: user}, () => {
        this.setState({loading: false});
      });
    }).catch((e) => console.log(e));
  }

  render() {
    console.log('Dashboard render ');

    if (this.state.loading) {
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

    return (
      <Grid container justify='center' direction='row' className='Dashboard'>
        <Grid container item xs={12} className='user-wrapper' style={{minHeight: '46vh'}}>
          <UserData user={this.state.user} userData={this.state.userData}/>
          <UserGraph />
        </Grid>
        <Grid container item xs={12} className='company-wrapper' style={{minHeight: '46vh'}}>
          <CompanyGraph />
        </Grid>
      </Grid>
    );
  }
}

export default Dashboard;
