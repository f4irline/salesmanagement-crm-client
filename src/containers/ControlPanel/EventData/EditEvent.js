import React, { Component } from 'react';

import {withRouter} from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import axios from '../../../axios-options';

class EditEvent extends Component {

  state = {
    data: this.props.data,
    loading: false
  }

  componentDidMount() {
    if (!this.state.data.eventId) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const { id } = this.props.match.params;
    this.setState({loading: true}, () => {
      axios.get(`event/${id}`)
        .then((res) => { 
          this.setState({data: res.data, loading: false});
        })
        .catch(err => console.log(err));
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
            TAPAHTUMAN MUOKKAUS
          </Typography>
        </Grid>
        <Grid container>
          <Grid item container justify='center' xs={6}>
            <TextField
              fullWidth
              variant='outlined'
              label='Tapahtuman ID'
              defaultValue={this.state.data.eventId}
              disabled></TextField>
          </Grid>
          <Grid item container justify='center' xs={6}>
            <TextField
              fullWidth
              variant='outlined'
              type='date'
              required
              label='Päivämäärä'
              defaultValue={this.state.data.date}></TextField>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item container justify='center' xs={6}>
            <TextField
              fullWidth
              variant='outlined'
              label='Yhteyshenkilö'
              defaultValue={this.state.data.contactPerson}
              disabled></TextField>
          </Grid>
          <Grid item container justify='center' xs={6}>
            <TextField
              fullWidth
              variant='outlined'
              type='date'
              required
              label='Päivämäärä'
              defaultValue={this.state.data.date}></TextField>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item container justify='center' xs={6}>
            <TextField
              fullWidth
              variant='outlined'
              label='Tapahtuman ID'
              defaultValue={this.state.data.eventId}
              disabled></TextField>
          </Grid>
          <Grid item container justify='center' xs={6}>
            <TextField
              fullWidth
              variant='outlined'
              type='date'
              required
              label='Päivämäärä'
              defaultValue={this.state.data.date}></TextField>
          </Grid>
        </Grid>
      </Grid>  
    );  
  }
}

export default withRouter(EditEvent);