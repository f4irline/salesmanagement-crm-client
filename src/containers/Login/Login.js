import React, { Component } from 'react';
import './Login.css';

class Login extends Component {

  state = {
    name: '',
    password: ''
  }

  handleButtonClick() {
    this.props.onLogin(this.state.name);
  }

  handleInputChange(e) {
    switch (e.target.name) {
    case 'username':
      this.setState({name: e.target.value});
      break;
    case 'password':
      this.setState({password: e.target.value});
      break;
    default:
      break;
    }
  }

  render() {
    return (
      <div className='Login'>
        <div className='form-wrapper'>
          <input onChange={this.handleInputChange.bind(this)} className='input name' type="text" name="username" placeholder="Name"></input>
          <input onChange={this.handleInputChange.bind(this)} className='input password' type="text" name="password" placeholder="Password"></input>
          <button className='input' onClick={this.handleButtonClick.bind(this)}>Submit</button>
        </div>
      </div>
    );
  }
}

export default Login;