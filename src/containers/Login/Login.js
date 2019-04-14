import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import './Login.css';

import axios from '../../axios-options';

class Login extends Component {

  state = {
    userName: '',
    password: '',
    error: false,
    errorBlocked: false
  }

  handleKeyPress = event => {
    if(event.key === 'Enter') {
      this.handleButtonClick();
    }
  }

  handleButtonClick() {
    let user = {
      userName: this.state.userName,
      password: this.state.password
    };

    axios.post('/auth/login', user, {
      credentials: 'include'
    })
      .then((res) => {
        sessionStorage.setItem('accessToken', res.data.accessToken);
        this.props.onLogin();
        this.setState({error: false});
      })
      .catch((err) => {
        if(err.request.status === 403) {
          this.setState({errorBlocked: true, error: false});
        } else {
          this.setState({error: true, errorBlocked:false});
        }
      });
  }

  handleInputChange(event) {
    switch (event.target.name) {
    case 'userName':
      this.setState({userName: event.target.value});
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
        <Paper className='MuiPaper-root-1' elevation={5}>
          <Typography variant='h5' gutterBottom>
            KIRJAUTUMINEN
          </Typography>
          <Divider />
          <TextField
            className='login-item'
            label='Käyttäjätunnus id'
            value={this.state.userName}
            onChange={this.handleInputChange.bind(this)}
            onKeyPress={this.handleKeyPress.bind(this)}
            margin='normal'
            name='userName'
            type='text'
          />
          <TextField
            className='login-item'
            label='Salasana'
            value={this.state.password}
            onChange={this.handleInputChange.bind(this)}
            onKeyPress={this.handleKeyPress.bind(this)}
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
          {this.state.error ? <Typography className='Error'>Virheellinen Käyttäjätunnus tai salasana</Typography> : null}
          {this.state.errorBlocked ? <Typography className='Error'>Käyttäjä lukittu, yritä uudelleen 15min kuluttua</Typography> : null}
        </Paper>      
      </div>
    );
  }
}

export default Login;