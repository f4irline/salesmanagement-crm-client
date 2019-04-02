import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import axios from '../../../axios-options';
import {withRouter} from 'react-router-dom';

class EditLead extends Component {

  state = {
    data: this.props.data,
    loading: false    
  }

  componentDidMount() {
    if(!this.state.data.leadId) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const { id } = this.props.match.params;
    this.setState({loading: true}, () => {
      axios.get(`leads/${id}`)
        .then((res) => { 
          this.setState({data: res.data, loading: false});
        })
        .catch(err => console.log(err));
    });
  }

  handleDateChange = event => {
    event.preventDefault();
  }

  render() {

    if (this.state.loading) {
      return (
        <p>Loading...</p>
      );
    }

    return(
      <Grid container direction='column' alignItems='center'>
        <Grid item xs={12} style={{textAlign: 'center'}}>
          <Typography variant='h4' gutterBottom>
            LIIDIN MUOKKAUS
          </Typography>
        </Grid>
        <Grid container>
          <Grid item container justify='center' xs={12} md={6}>
            <TextField
              fullWidth
              variant='outlined'
              disabled
              label='Liidi ID'
              value={this.state.data.leadId}></TextField>
          </Grid>
          <Grid item container justify='center' xs={12} md={6}>
            <TextField
              label='Luotu'
              fullWidth
              variant='outlined'
              type='date'
              value={this.state.data.date}
              onChange={this.handleDateChange}></TextField>
          </Grid>
          <Grid item container justify='center' xs={12} md={6}>
            <TextField
              fullWidth
              variant='outlined'
              label='Nimi'
              value={this.state.data.companyName}></TextField>
          </Grid>
          <Grid item container justify='center' xs={12} md={6}>
            <TextField
              fullWidth
              variant='outlined'
              label='Ala'
              value={this.state.data.industry}></TextField>
          </Grid>
          <Grid item container justify='center' xs={12} md={6}>
            <TextField
              fullWidth
              variant='outlined'
              label='Yhteyshenkilö'
              value={this.state.data.contactPerson}></TextField>
          </Grid>
          <Grid item container justify='center' xs={12} md={6}>
            <TextField
              fullWidth
              variant='outlined'
              label='Rooli'
              value={this.state.data.contactRole}></TextField>
          </Grid>
          <Grid item container justify='center' xs={12} md={6}>
            <TextField
              fullWidth
              variant='outlined'
              label='Puhelin'
              value={this.state.data.phoneNumber}></TextField>
          </Grid>
          <Grid item container justify='center' xs={12} md={6}>
            <TextField
              fullWidth
              variant='outlined'
              label='Email'
              value={this.state.data.email}></TextField>
          </Grid>
          <Grid item container justify='center' xs={12} md={6}>
            <TextField
              fullWidth
              variant='outlined'
              label='WWW'
              value={this.state.data.website}></TextField>
          </Grid>
          <Grid item container justify='center' xs={12} md={6}>
            <TextField
              fullWidth
              variant='outlined'
              label='Huom'
              value={this.state.data.notes}></TextField>
          </Grid>
        </Grid>
      </Grid> 
    );

  }

}

export default withRouter(EditLead);