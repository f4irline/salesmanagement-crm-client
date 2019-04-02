import React, { Component } from 'react';

import {withRouter} from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';

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
    console.log(this.state.data);
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
              defaultValue={this.state.data.contactPerson}></TextField>
          </Grid>
          <Grid item container justify='center' xs={6}>
            <TextField
              fullWidth
              variant='outlined'
              required
              label='Sähköposti'
              defaultValue={this.state.data.email}></TextField>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item container justify='center' xs={6}>
            <TextField
              fullWidth
              variant='outlined'
              label='Puhelinnumero'
              defaultValue={this.state.data.phoneNumber}></TextField>
          </Grid>
          <Grid item container justify='center' xs={6}>
            <TextField
              fullWidth
              variant='outlined'
              required
              label='Paikka'
              defaultValue={this.state.data.place}></TextField>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item container justify='center' xs={6}>
            <TextField
              fullWidth
              variant='outlined'
              label='Summa'
              defaultValue={this.state.data.sum}></TextField>
          </Grid>
          <Grid item container justify='center' xs={6}>
            <FormControl className='content-item'>
              <Select
                name='companyName'
                displayEmpty
                value={this.state.companyName}
                onChange={this.handleChange}
                input={
                  <OutlinedInput
                    name="company"
                    labelWidth={0}
                  />
                }
                required>
                {this.props.leadNames}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item container justify='center' xs={12}>
            <TextField
              fullWidth
              variant='outlined'
              required
              label='Lisätiedot'
              multiline
              defaultValue={this.state.data.notes}></TextField>
          </Grid>
        </Grid>
      </Grid>  
    );  
  }
}

export default withRouter(EditEvent);