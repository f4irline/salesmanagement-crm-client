import React from 'react';
import { Component } from 'react';
import './UserData.css';

import Typography from '@material-ui/core/Typography';

class UserData extends Component {
  BASE_URL = 'https://vc-system-server.herokuapp.com/user/';
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
        <Typography variant="h2">
            hellurei {this.state.user.name}
        </Typography>
        <Typography variant="h3" gutterBottom>
            lastLogin: {this.state.user.lastLogin}
        </Typography>
      </div>
    );
  }
}

export default UserData;