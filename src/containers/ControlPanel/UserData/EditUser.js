import React, { Component } from 'react';

import {withRouter} from 'react-router-dom';
import axios from '../../../axios-options';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

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

  render() {
    if (this.state.loading) {
      return (
        <p>Loading...</p>
      );
    }

    return (
      <Grid container direction='column' alignItems='center'>
        <Grid item xs={12} style={{textAlign: 'center'}}>
          <Typography variant='h4' gutterBottom>
            KÄYTTÄJÄN MUOKKAUS
          </Typography>
        </Grid>
        <Grid container>
          <Grid item container justify='center' xs={6}>
            <TextField
              fullWidth
              variant='outlined'
              label='Käyttäjän ID'
              defaultValue={this.state.data.userId}
              disabled></TextField>
          </Grid>
          <Grid item container justify='center' xs={6}>
            <TextField
              fullWidth
              variant='outlined'
              required
              label='Etunimi'
              defaultValue={this.state.data.userFirst}></TextField>
          </Grid>
          <Grid item container justify='center' xs={6}>
            <TextField
              fullWidth
              variant='outlined'
              required
              label='Sukunimi'
              defaultValue={this.state.data.userLast}></TextField>
          </Grid>
          <Grid item container justify='center' xs={6}>
            <TextField
              fullWidth
              variant='outlined'
              required
              label='Rooli'
              defaultValue={this.state.data.role}></TextField>
          </Grid>
          <Grid item container justify='center' xs={12}>
            <TextField
              fullWidth
              variant='outlined'
              required
              label='Kuukausitavoite'
              defaultValue={this.state.data.monthlyGoal}></TextField>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(EditUser);