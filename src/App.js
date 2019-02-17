import React, { Component } from 'react';
import Navigation from './containers/Navigation/Navigation';
import Footer from './containers/Footer/Footer';
import Login from './containers/Login/Login';
import './App.css';

class App extends Component {

  state = {
    loggedIn: false,
    name: ''
  }

  /**
   * Handles logging user in
   * 
   * @param {String} name 
   */
  handleLogin(name) {
    this.setState({loggedIn: true, name: name});
  }

  render() {

    if (!this.state.loggedIn) {
      return (
        <div className='App'>
          <Login onLogin={this.handleLogin.bind(this)} />
        </div>
      );
    }

    return (
      <div className='App'>
        <Navigation />
        <Footer name={this.state.name}/>
      </div>
    );
  }
}

export default App;
