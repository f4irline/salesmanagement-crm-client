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
    this.setState({loading: true}, () => {
      axios.get(`users/${id}`)
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

export default withRouter(EditUser);