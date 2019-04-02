import React, { Component } from 'react';

import {withRouter} from 'react-router-dom';
import axios from '../../../axios-options';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class EditUser extends Component {

  state = {
    data: this.props.data,
    loading: false
  }

  componentDidMount() {
    if (!this.state.data.userId) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const { id } = this.props.match.params;
    console.log(id);
    this.setState({loading: true}, () => {
      axios.get(`users/${id}`)
        .then((res) => { 
          this.setState({data: res.data, loading: false});
        })
        .catch(err => console.log(err));
    });
  }

  handleChange = (e) => {
    this.setState({
      data: Object.assign({}, this.state.data, {[e.target.name]: e.target.value})
    });
  }

  handleSave = () => {
    axios.put('/admin/users/edit', this.state.data)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  render() {
    if (this.state.loading) {
      return (
        <p>Loading...</p>
      );
    }

    return (
      <Grid container direction='column' alignItems='center'>
        <Grid item xs={11} style={{textAlign: 'center', marginTop: '5vh'}}>
          <Typography variant='h4' gutterBottom>
            KÄYTTÄJÄN MUOKKAUS
          </Typography>
        </Grid>
        <Grid container justify='space-around'>
          <Grid style={{marginTop: '3vh'}} item xs={11}>
            <TextField
              fullWidth
              variant='outlined'
              label='Käyttäjän ID'
              defaultValue={this.state.data.userId}
              disabled></TextField>
          </Grid>
          <Grid style={{marginTop: '3vh'}} item xs={11}>
            <TextField
              fullWidth
              variant='outlined'
              name='userFirst'
              required
              label='Etunimi'
              defaultValue={this.state.data.userFirst}
              onChange={this.handleChange}></TextField>
          </Grid>
        </Grid>
        <Grid container justify='space-around'>
          <Grid style={{marginTop: '3vh'}} item xs={11}>
            <TextField
              fullWidth
              variant='outlined'
              name='userLast'
              required
              label='Sukunimi'
              defaultValue={this.state.data.userLast}
              onChange={this.handleChange}></TextField>
          </Grid>
          <Grid style={{marginTop: '3vh'}} item xs={11}>
            <TextField
              fullWidth
              variant='outlined'
              name='role'
              required
              label='Rooli'
              defaultValue={this.state.data.role}
              onChange={this.handleChange}></TextField>
          </Grid>
        </Grid>
        <Grid container justify='space-around'>
          <Grid style={{marginTop: '3vh'}} item xs={11}>
            <TextField
              fullWidth
              variant='outlined'
              name='monthlyGoal'
              required
              label='Kuukausitavoite'
              defaultValue={this.state.data.monthlyGoal}
              onChange={this.handleChange}></TextField>
          </Grid>
        </Grid>
        <Button onClick={this.handleSave.bind(this)} size='large' style={{color: '#FFF', marginTop: '5vh', width: '15vw'}} variant='contained' color='primary'>
          Tallenna
        </Button>
      </Grid>
    );
  }
}

export default withRouter(EditUser);