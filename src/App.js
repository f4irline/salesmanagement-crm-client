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
    loggedIn: true,
    modalOpen: false,
    user_id: 100001,
    leads: []
  }

  componentDidMount() {
    print('App', 'componentDidMount');
    axios.get('/leads')
      .then(res => this.setState({leads: res.data}));
  }

  updateLeads() {
    axios.get('/leads')
      .then(res => this.setState({leads: res.data, modalOpen: false}));
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

    return (
      <div className='App'>
        <Navigation handleLogout = {this.handleLogout.bind(this)} handleConfiguration = {this.handleConfiguration.bind(this)}/>
        <Switch>
          <Route path='/' render={() => <Dashboard user_id={this.state.user_id}/>} exact />
          <Route path='/leaderboards' render={() => <Leaderboards />} />
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
          <ModalContent updateLeads={this.updateLeads.bind(this)} userId={this.state.user_id} closeModal={this.modalClose.bind(this)} leads={this.state.leads}/>
        </Modal>
      </div>
    );
  }
}

export default App;
