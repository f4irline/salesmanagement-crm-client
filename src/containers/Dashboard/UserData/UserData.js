import React from 'react';
import { Component } from 'react';
import './UserData.css';

class UserData extends Component {
  BASE_URL = "https://vc-system-server.herokuapp.com/user/";
  constructor(props) {
    super(props);
    console.log('UserData constructor');
    let user = {};
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
    }).catch((e) => console.log(e));
  }

  render() {
    console.log('UserData render');
    return (
      <div className='UserData'>
      hellurei {this.state.user.name}, lastLogin: {this.state.user.lastLogin}
      </div>
    );
  }
}

export default UserData;