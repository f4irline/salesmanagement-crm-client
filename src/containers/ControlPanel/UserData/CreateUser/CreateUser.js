import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Paper } from '@material-ui/core';

import axios from '../../../../axios-options';

class CreateUser extends Component {
  state = {
    userName: '',
    userFirst: '',
    userLast: '',
    password: '',
    monthlyGoal: undefined
  }

  handleCreate = () => {
    const jwt = localStorage.getItem('accessToken');
    const options = {
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    };

    axios.post('/auth/register', this.state, options)
      .then((res) => {
        this.props.update();
        this.props.history.push('/admin/users');
      });
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    return (
      <Paper style={{padding: '1vw'}}>
        <Grid container direction='column' alignItems='center'>
          <Grid item xs={11} style={{textAlign: 'center', marginTop: '5vh'}}>
            <Typography variant='h4' gutterBottom>
              KÄYTTÄJÄN LUONTI
            </Typography>
          </Grid>
          <Grid container justify='space-around'>
            <Grid style={{marginTop: '3vh'}} item xs={11} md={5}>
              <TextField
                fullWidth
                variant='outlined'
                name='userName'
                required
                label='Käyttäjätunnus'
                onChange={this.handleChange}></TextField>
            </Grid>
            <Grid style={{marginTop: '3vh'}} item xs={11} md={5}>
              <TextField
                fullWidth
                variant='outlined'
                name='password'
                type='password'
                required
                label='Salasana'
                onChange={this.handleChange}></TextField>
            </Grid>
          </Grid>
          <Grid container justify='space-around'>
            <Grid style={{marginTop: '3vh'}} item xs={11} md={5}>
              <TextField
                fullWidth
                variant='outlined'
                name='userFirst'
                required
                label='Etunimi'
                onChange={this.handleChange}></TextField>
            </Grid>
            <Grid style={{marginTop: '3vh'}} item xs={11} md={5}>
              <TextField
                fullWidth
                variant='outlined'
                name='userLast'
                required
                label='Sukunimi'
                onChange={this.handleChange}></TextField>
            </Grid>
          </Grid>
          <Grid container justify='space-around'>
            <Grid style={{marginTop: '3vh'}} item xs={11} md={5}>
              <TextField
                fullWidth
                variant='outlined'
                type='number'
                name='monthlyGoal'
                required
                label='Kuukausitavoite'
                onChange={this.handleChange}></TextField>
            </Grid>
          </Grid>
          <Button onClick={this.handleCreate} size='large' style={{color: '#FFF', marginTop: '5vh', width: '15vw'}} variant='contained' color='primary'>
            Tallenna
          </Button>
        </Grid>
      </Paper>
    );  
  }
}

export default withRouter(CreateUser);