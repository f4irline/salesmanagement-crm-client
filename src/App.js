import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import Dashboard from './containers/Dashboard/Dashboard';
import Leaderboards from './containers/Leaderboards/Leaderboards';
import Navigation from './containers/Navigation/Navigation';
import Footer from './containers/Footer/Footer';
import Login from './containers/Login/Login';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ModalContent from './components/ModalContent/ModalContent';
import Modal from '@material-ui/core/Modal';
import './App.css';

class App extends Component {

  state = {
    loggedIn: true,
    modalOpen: false,
    name: ''
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

  render() {
    if (!this.state.loggedIn) {
      return (
        <Login onLogin={this.handleLogin.bind(this)} />
      );
    }

    return (
      <div className='App'>
        <Navigation handleLogout = {this.handleLogout.bind(this)} handleConfiguration = {this.handleConfiguration.bind(this)}/>
        <Switch>
          <Route path="/" component={Dashboard} exact />
          <Route path="/leaderboards" component={Leaderboards} />
          <Route component={Error} />
        </Switch>
        <Footer name={this.state.name}/>
        <div className='add-wrapper'>
          <Fab size='large' color='primary'>
            <AddIcon onClick={this.modalOpen.bind(this)} />
          </Fab>
        </div>
        <Modal 
          open={this.state.modalOpen} 
          onClose={this.modalClose.bind(this)}
          className='modal-wrapper'
          onEscapeKeyDown={this.modalClose.bind(this)}>
          <ModalContent />
        </Modal>
      </div>
    );
  }
}

export default App;
