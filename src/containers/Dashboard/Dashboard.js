import React from 'react';
import { Component } from 'react';
import './Dashboard.css';

class Dashboard extends Component {
  BASE_URL = "http://localhost:8080/user/";
  constructor(props) {
    super(props);
    console.log('Dashboard constructor');
    let user = '';
    this.state = {name: props.name, user: user};
  }

  componentDidMount() {
    let url = `${this.BASE_URL}${this.state.name}`;
    console.log(url);
    fetch(url).then(
      (resp) => resp.json()).then((user) => {
      console.log(user);
      let stateObj = {user: user};
      this.setState(stateObj);
    });
  }

  render() {
    console.log('Dashboard render');
    return (
      <div className='Dashboard'>
      hellurei {this.state.name}{this.state.user}
      </div>
    );
  }
}

export default Dashboard;
