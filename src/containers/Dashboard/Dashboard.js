import React from 'react';
import { Component } from 'react';
import './Dashboard.css';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import UserData from './UserData/UserData';
import UserGraph from './UserGraph/UserGraph';
import CompanyGraph from './CompanyGraph/CompanyGraph';

class Dashboard extends Component {
  state = {
    user_id: this.props.user_id,
    user: this.props.user,
    userData: this.props.userData,
    company: this.props.companyData
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.name !== this.state.name) {
      return true;
    } else if (nextState.user !== this.state.user) {
      return true;
    } else if (nextState.userData !== this.state.userData) {
      return true;
    } else if (nextState.company !== this.state.company) {
      return true;
    }
    
    return false;
  }

  render() {    
    return (
      <Grid container justify='space-between' direction='row' className='Dashboard'>
        <Grid container justify='space-around' item className='user-wrapper'>
          <UserData user={this.state.user} userData={this.state.userData}/>
          <UserGraph sales={this.state.userData.total_sales} goal={this.state.user.monthlyGoal}/>
        </Grid>
        <Divider variant='middle' />
        <Grid container justify='space-around' item className='company-wrapper'>
          <CompanyGraph companyDates={this.props.companyDates} changeDate={this.props.updateCompany} companyData={this.state.company} />
        </Grid>
      </Grid>
    );
  }
}

export default Dashboard;
