import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import './Login.css';

class Login extends Component {

  state = {
    name: '',
    password: ''
  }

  handleButtonClick() {
    this.props.onLogin(this.state.name);
  }

  handleInputChange(event) {
    switch (event.target.name) {
    case 'username':
      this.setState({name: event.target.value});
      break;
    case 'password':
      this.setState({password: event.target.value});
      break;
    default:
      break;
    }
  }

  render() {
    return (
      <div className='Login'>
        <div className='form-wrapper'>
          <Typography variant="h5" gutterBottom>
            USER LOGIN
          </Typography>
          <Divider />
          <TextField
            id="standard-name"
            label="Name"
            value={this.state.name}
            onChange={this.handleInputChange.bind(this)}
            margin="dense"
            name="username"
          />
          <TextField
            id="standard-name"
            label="Password"
            value={this.state.password}
            onChange={this.handleInputChange.bind(this)}
            margin="dense"
            name="password"
          />
          <Button size="medium" onClick={this.handleButtonClick.bind(this)} variant="contained">
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

export default Login;