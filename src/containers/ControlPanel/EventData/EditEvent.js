import React, { Component } from 'react';

import {withRouter} from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';

import axios from '../../../axios-options';

class EditEvent extends Component {

  state = {
    data: {},
    loading: false,
    companyName: undefined
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const { id } = this.props.match.params;
    this.setState({loading: true}, () => {
      axios.get(`event/${id}`)
        .then((res) => { 
          this.setState({data: res.data}, () => {
            this.setState({loading: false, companyName: this.state.data.lead.companyName});
          });
        })
        .catch(err => console.log(err));
    });
  }

  handleSave = () => {
    axios.put('/admin/events/edit', this.state.data)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  handleChange = (e) => {
    this.setState({
      data: Object.assign({}, this.state.data, {[e.target.name]: e.target.value})
    });
  }
  
  handleLeadChange = (e) => {
    this.setState({
      companyName: e.target.value
    });
  }

  render() {
    if (this.state.loading || this.state.companyName === undefined) {
      return (
        <p>Loading...</p>
      );
    }

    return (
      <Grid container direction='column' alignItems='center'>
        <Grid item xs={12} style={{textAlign: 'center', marginTop: '5vh'}}>
          <Typography variant='h4' gutterBottom>
            TAPAHTUMAN MUOKKAUS
          </Typography>
        </Grid>
        <Grid container justify='space-around'>
          <Grid style={{marginTop: '3vh'}} item xs={12} md={5}>
            <TextField
              fullWidth
              variant='outlined'
              label='Tapahtuman ID'
              value={this.state.data.eventId}
              disabled></TextField>
          </Grid>
          <Grid style={{marginTop: '3vh'}} item xs={12} md={5}>
            <TextField
              fullWidth
              variant='outlined'
              name='date'
              type='date'
              required
              onChange={this.handleChange}
              label='Päivämäärä'
              value={this.state.data.date}></TextField>
          </Grid>
        </Grid>
        <Grid container justify='space-around'>
          <Grid style={{marginTop: '3vh'}} item xs={12} md={5}>
            <TextField
              fullWidth
              name='contactPerson'
              variant='outlined'
              onChange={this.handleChange}
              label='Yhteyshenkilö'
              value={this.state.data.contactPerson}></TextField>
          </Grid>
          <Grid style={{marginTop: '3vh'}} item xs={12} md={5}>
            <TextField
              fullWidth
              name='email'
              variant='outlined'
              required
              onChange={this.handleChange}
              label='Sähköposti'
              value={this.state.data.email}></TextField>
          </Grid>
        </Grid>
        <Grid container justify='space-around'>
          <Grid style={{marginTop: '3vh'}} item xs={12} md={5}>
            <TextField
              fullWidth
              variant='outlined'
              name='phoneNumber'
              label='Puhelinnumero'
              onChange={this.handleChange}
              value={this.state.data.phoneNumber}></TextField>
          </Grid>
          <Grid style={{marginTop: '3vh'}} item xs={12} md={5}>
            <TextField
              fullWidth
              variant='outlined'
              name='place'
              required
              label='Paikka'
              onChange={this.handleChange}
              value={this.state.data.place}></TextField>
          </Grid>
        </Grid>
        <Grid container justify='space-around'>
          <Grid style={{marginTop: '3vh'}} item xs={12} md={5}>
            <TextField
              fullWidth
              variant='outlined'
              name='sum'
              label='Summa'
              type='number'
              onChange={this.handleChange}
              value={this.state.data.sum}></TextField>
          </Grid>
          <Grid style={{marginTop: '3vh'}} item xs={12} md={5}>
            <FormControl className='content-item' fullWidth>
              <Select
                name='companyName'
                displayEmpty
                value={this.state.data.lead.companyName}
                onChange={this.handleLeadChange}
                input={
                  <OutlinedInput
                    name='company'
                    labelWidth={0}
                  />
                }
                required>
                {this.props.leadNames}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container justify='space-around'>
          <Grid style={{marginTop: '3vh'}} item xs={12} md={11}>
            <TextField
              fullWidth
              variant='outlined'
              name='notes'
              onChange={this.handleChange}
              required
              label='Lisätiedot'
              multiline
              value={this.state.data.notes}></TextField>
          </Grid>
        </Grid>
        <Button onClick={this.handleSave.bind(this)} size='large' style={{color: '#FFF', marginTop: '5vh', width: '15vw'}} variant='contained' color='primary'>
          Tallenna
        </Button>
      </Grid>  
    );  
  }
}

export default withRouter(EditEvent);