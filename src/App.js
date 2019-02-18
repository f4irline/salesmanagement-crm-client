import React, { Component } from 'react';
import Navigation from './containers/Navigation/Navigation';
import Footer from './containers/Footer/Footer';
import Login from './containers/Login/Login';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Dashboard from './containers/Dashboard/Dashboard';
import Leaderboards from './containers/Leaderboards/Leaderboards';
import Error from './containers/Error/Error';

class App extends Component {

  state = {
    loggedIn: false,
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
<<<<<<< HEAD
        <Footer />
        <Switch>
          <Route path="/" component={Dashboard} exact />
          <Route path="/leaderboards" component={Leaderboards} />
          <Route component={Error} />
        </Switch>
=======
        <Footer name={this.state.name}/>
>>>>>>> 3212c3469d231004f22582080d39b4eddf84d7b6
      </div>
    );
  }
}

export default App;
