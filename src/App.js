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

import axios from './axios-options';

import './App.css';

const {print} = require('./utils/Debug');

class App extends Component {

  state = {
    loggedIn: false,
    modalOpen: false,
    user_id: -1,
    loadingLeads: false,
    loadingLeaderBoards: false,
    loadingUser: false,
    loadingUserData: false,
    leads: [], 
    leaderBoards: [],
    user: {},
    userData: {}
  }


  componentDidMount() {
    print('App', 'componentDidMount');
    this.updateLeads();
    this.updateLeaderBoards();
    this.updateUserData();
    this.updateUser();

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

  /**
   * Handles logging the user in
   * 
   * @param {String} name 
   */
  handleLogin(name) {
    print('App', 'hangleLogin');
    this.setState({loggedIn: true, name: name});
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

    if (this.state.loadingLeads || this.state.loadingLeaderBoards || this.state.loadingUser || this.state.loadingUserData) {
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
          <Route path='/' render={() => <Dashboard user={this.state.user} userData={this.state.userData} user_id={this.state.user_id}/>} exact />
          <Route path='/leaderboards' render={() => <Leaderboards data={this.state.leaderBoards} />} />
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
            userId={this.state.user_id} 
            closeModal={this.modalClose.bind(this)} 
            leads={this.state.leads}/>
        </Modal>
      </div>
    );
  }
}

export default App;
