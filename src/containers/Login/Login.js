import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import './Login.css';

import {print} from '../../utils/Debug';

class Login extends Component {

  state = {
    name: '',
    password: ''
  }

  handleButtonClick() {
    print('Login', 'handleButtonClick');
    this.props.onLogin(this.state.name);
  }

  handleInputChange(event) {
    print('Login', 'handleInputChange');
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
    print('Login', 'render');
    return (
      <div className='Login'>
        <Paper className='MuiPaper-root-1' elevation={5}>
          <Typography variant='h5' gutterBottom>
            USER LOGIN
          </Typography>
          <Divider />
          <TextField
            className='login-item'
            label='Name'
            value={this.state.name}
            onChange={this.handleInputChange.bind(this)}
            margin='normal'
            name='username'
          />
          <TextField
            className='login-item'
            label='Password'
            value={this.state.password}
            onChange={this.handleInputChange.bind(this)}
            name='password'
            margin='normal'
            type='password'
          />
          <Button             
            className='login-item'
            size='medium' 
            disabled={false}
            onClick={this.handleButtonClick.bind(this)} 
            variant='contained'>
            Submit
          </Button>
        </Paper>      
      </div>
    );
  }
}

export default Login;