import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ModalContent from './components/ModalContent/ModalContent';
import Modal from '@material-ui/core/Modal';

import Dashboard from './containers/Dashboard/Dashboard';
import Error from './containers/Error/Error';
import Leaderboards from './containers/Leaderboards/Leaderboards';
import Navigation from './containers/Navigation/Navigation';
import Login from './containers/Login/Login';
import ControlPanel from './containers/ControlPanel/ControlPanel';

import axios from './axios-options';

import './App.css';

const {print} = require('./utils/Debug');
const {getDate} = require('./utils/Date');

class App extends Component {

  state = {
    loggedIn: true,
    modalOpen: false,
    user_id: '100001',
    loadingLeads: false,
    loadingLeaderBoards: false,
    loadingUser: false,
    loadingUserData: false,
    loadingCompany: false,
    loadingControlPanel: false,
    leads: [], 
    leaderBoards: [],
    user: {},
    userData: {},
    companyData: [],
    adminData: {},
    startDate: getDate('monthFirst'),
    endDate: getDate('monthLast')
  }


  componentDidMount() {
    print('App', 'componentDidMount');
    if (this.state.loggedIn) {
      this.updateAll();
    }
  }

  updateAll() {
    this.updateCompanyData(this.state.startDate, this.state.endDate);
    this.updateLeads();
    this.updateLeaderBoards();
    this.updateUserData();
    this.updateUser();
  }

  updateCompanyData(startDate, endDate) {
    let start = undefined;
    let end = undefined;
    
    if (startDate === undefined && endDate === undefined) {
      start = this.state.startDate;
      end = this.state.endDate;
    } else {
      start = startDate;
      end = endDate;
    }

    let url_companyChart = `/companyChart/get/${start}/${end}`;
    this.setState({loadingCompany: true, startDate: start, endDate: end}, () => {
      axios.get(url_companyChart)
        .then(res => this.setState({companyData: res.data}, () => {
          this.setState({loadingCompany: false});
        }));
    });
  }

  updateUserData() {
    let url_userData = `/userData/${this.state.user_id}`;
    this.setState({loadingUserData: true}, () => {
      axios.get(url_userData)
        .then(userData => this.setState({userData: userData.data, modalOpen: false}, () => {
          this.setState({loadingUserData: false});
          print('App', 'updateUserData');
        }))
        .catch(err => console.log(err));
    });
  }

  updateUser() {
    let url_user = `/users/${this.state.user_id}`;
    this.setState({loadingUser: true}, () => {
      axios.get(url_user)
        .then(user => this.setState({user: user.data}, () => {
          this.setState({loadingUser: false});
          print('App', 'updateUser');
        }))
        .catch(err => console.log(err));
    });
  }

  updateLeaderBoards() {
    this.setState({loadingLeaderBoards: true}, () => {
      axios.get('/userData/all')
        .then(res => this.setState({leaderBoards: res.data, modalOpen: false}, () => {
          this.setState({loadingLeaderBoards: false});
          print('App', 'updateLeaderBoards');
        }));
    });
  }

  updateLeads() {
    this.setState({loadingLeads: true}, () => {
      axios.get('/leads')
        .then(res => this.setState({leads: res.data, modalOpen: false}, () => {
          this.setState({loadingLeads: false});
          print('App', 'updateLeads');
        }));
    });
  }

  updateAdmin() {
    this.setState({loadingControlPanel: true}, () => {
      axios.get('/admin')
        .then(res => this.setState({adminData: res.data, modalOpen: false}, () => {
          this.setState({loadingControlPanel: false});
          print('App', 'updateControlPanel');
        }));
    });
  }

  /**
   * Handles logging the user in
   * 
   * @param {String} name 
   */
  handleLogin(userId) {
    console.log(userId);
    print('App', 'hangleLogin');
    this.setState({loggedIn: true, user_id: userId}, () => {
      this.updateAll();
    });
  }

  handleLogout() {
    print('App', 'handleLogout');
    this.setState({loggedIn: false});
  }

  handleConfiguration () {
    print('App', 'handleConfiguration');
  }

  modalClose() {
    print('App', 'modalClose');
    this.setState({modalOpen: false});
  }

  modalOpen() {
    print('App', 'modalOpen');
    this.setState({modalOpen: true});
  }

  redirect() {
    print('App', 'redirect');
    this.context.router.push('/');
  }

  render() {
    print('App', 'render');
    if (!this.state.loggedIn) {
      return (
        <div>
          <Redirect to='/' />
          <Login onLogin={this.handleLogin.bind(this)} />
        </div>
      );
    }

    if (this.state.loadingLeads || this.state.loadingLeaderBoards || this.state.loadingUser || this.state.loadingUserData || this.state.loadingCompany) {
      return (
        <div className='App'>
          <Navigation handleLogout = {this.handleLogout.bind(this)} handleConfiguration = {this.handleConfiguration.bind(this)}/>
        </div>
      );
    }

    return (
      <div className='App'>
        <Navigation handleLogout = {this.handleLogout.bind(this)} handleConfiguration = {this.handleConfiguration.bind(this)}/>
        <Switch>
          <Route path='/' render={() => <Dashboard 
            user={this.state.user} 
            userData={this.state.userData} 
            companyData={this.state.companyData}
            companyDates={[this.state.startDate, this.state.endDate]}
            updateCompany={this.updateCompanyData.bind(this)} 
            user_id={this.state.user_id}/>} 
          exact />
          <Route path='/leaderboards' render={() => <Leaderboards data={this.state.leaderBoards} />} />
          <Route path='/admin' render={() => <ControlPanel data={this.state.leaderBoards} />} />
          <Route component={Error} />
        </Switch>
        <div className='add-wrapper'>
          <Fab className='add-icon' onClick={this.modalOpen.bind(this)} size='large' color='primary'>
            <AddIcon />
          </Fab>
        </div>
        <Modal 
          open={this.state.modalOpen} 
          onClose={this.modalClose.bind(this)}
          className='modal-wrapper'
          onEscapeKeyDown={this.modalClose.bind(this)}>
          <ModalContent
            updateUserData={this.updateUserData.bind(this)}
            updateLeaderBoards={this.updateLeaderBoards.bind(this)} 
            updateLeads={this.updateLeads.bind(this)} 
            updateCompanyGraph={this.updateCompanyData.bind(this)}
            userId={this.state.user_id} 
            closeModal={this.modalClose.bind(this)} 
            leads={this.state.leads}/>
        </Modal>
      </div>
    );
  }
}

export default App;
