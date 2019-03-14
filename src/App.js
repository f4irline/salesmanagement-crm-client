import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Dashboard from './containers/Dashboard/Dashboard';
import Leaderboards from './containers/Leaderboards/Leaderboards';
import Navigation from './containers/Navigation/Navigation';
import Login from './containers/Login/Login';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ModalContent from './components/ModalContent/ModalContent';
import Modal from '@material-ui/core/Modal';
import leads from './placeholders/leads.json'; 
import './App.css';

class App extends Component {

  state = {
    loggedIn: true,
    modalOpen: false,
    name: '',
    leads: []
  }

  componentDidMount() {
    this.setState({leads: leads.leads});
  }

  /**
   * Handles logging the user in
   * 
   * @param {String} name 
   */
  handleLogin(name) {
    this.setState({loggedIn: true, name: name});
  }

  handleLogout() {
    this.setState({loggedIn: false});
  }

  handleConfiguration () {
    console.log('handleConfiguration');
  }

  modalClose() {
    this.setState({modalOpen: false});
  }

  modalOpen() {
    this.setState({modalOpen: true});
  }

  redirect() {
    this.context.router.push('/');
  }

  render() {
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
          <Route path='/' component={()=><Dashboard name={this.state.name}/>} exact />
          <Route path='/leaderboards' component={Leaderboards} />
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
          <ModalContent leads={this.state.leads}/>
        </Modal>
      </div>
    );
  }
}

export default App;
