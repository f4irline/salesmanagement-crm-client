import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import axios from '../../../axios-options';
import {withRouter} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Loading from '../../../components/Loading/Loading';

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
    const jwt = sessionStorage.getItem('accessToken');

    const { id } = this.props.match.params;
    this.setState({loading: true}, () => {
      axios.get(`leads/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      })
        .then((res) => { 
          this.setState({data: res.data, loading: false});
        })
        .catch(err => console.error(err));
    });
  }

  handleSave = () => {
    const jwt = sessionStorage.getItem('accessToken');
    const options = {
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    };

    const sentData = {};

    for (const key in this.state.data) {
      if (key !== 'discussion') {
        sentData[key] = this.state.data[key];
      } else {
        if (Array.isArray(this.state.data[key])) {
          if (Array.isArray(this.state.data[key][0])) {
            sentData[key] = this.state.data[key][0];
          } else {
            sentData[key] = this.state.data[key];
          }
        } else {
          sentData[key] = this.state.data[key].split(',');
        }
      }
    }

    axios.put('/admin/leads/edit', sentData, options)
      .then((res) => {
        this.props.update();
        this.props.history.push('/admin/leads');
      })
      .catch(err => console.error(err));
  }

  handleChange = (e) => {
    this.setState({
      data: Object.assign({}, this.state.data, {[e.target.name]: e.target.value})
    });
  }

  render() {

    if (this.state.loading) {
      return (
        <Loading />
      );
    }

    return(
      <Grid container direction='column' alignItems='center'>
        <Grid item xs={12} style={{textAlign: 'center', marginTop: '5vh'}}>
          <Typography variant='h4' gutterBottom>
            LIIDIN MUOKKAUS
          </Typography>
        </Grid>
        <Grid container justify='space-around'>
          <Grid style={{marginTop: '3vh'}} item xs={12} md={3}>
            <TextField
              fullWidth
              variant='outlined'
              disabled
              label='Liidi ID'
              value={this.state.data.leadId}></TextField>
          </Grid>
          <Grid style={{marginTop: '3vh'}} item xs={12} md={3}>
            <TextField
              label='Luotu'
              fullWidth
              name='date'
              variant='outlined'
              type='date'
              value={this.state.data.date}
              onChange={this.handleChange}></TextField>
          </Grid>
          <Grid style={{marginTop: '3vh'}} item xs={12} md={3}>
            <TextField
              fullWidth
              variant='outlined'
              name='companyName'
              label='Nimi'
              value={this.state.data.companyName}
              onChange={this.handleChange}></TextField>
          </Grid>
        </Grid>
        <Grid container justify='space-around'>
          <Grid style={{marginTop: '3vh'}} item xs={12} md={3}>
            <TextField
              fullWidth
              variant='outlined'
              name='industry'
              label='Ala'
              value={this.state.data.industry}
              onChange={this.handleChange}></TextField>
          </Grid>
          <Grid style={{marginTop: '3vh'}} item xs={12} md={3}>
            <TextField
              fullWidth
              variant='outlined'
              name='meeted'
              label='Tavattu'
              value={this.state.data.meeted}
              onChange={this.handleChange}></TextField>
          </Grid>
          <Grid style={{marginTop: '3vh'}} item xs={12} md={3}>
            <TextField
              fullWidth
              variant='outlined'
              name='discussion'
              label='Keskustelun aihe'
              value={this.state.data.discussion ? this.state.data.discussion.toString() : undefined}
              onChange={this.handleChange}></TextField>
          </Grid>
        </Grid>
        <Grid container justify='space-around'>
          <Grid style={{marginTop: '3vh'}} item xs={12} md={3}>
            <TextField
              fullWidth
              variant='outlined'
              name='contactPerson'
              label='Yhteyshenkilö'
              value={this.state.data.contactPerson}
              onChange={this.handleChange}></TextField>
          </Grid>
          <Grid style={{marginTop: '3vh'}} item xs={12} md={3}>
            <TextField
              fullWidth
              variant='outlined'
              name='contactRole'
              label='Rooli'
              value={this.state.data.contactRole}
              onChange={this.handleChange}></TextField>
          </Grid>
          <Grid style={{marginTop: '3vh'}} item xs={12} md={3}>
            <TextField
              fullWidth
              variant='outlined'
              name='phoneNumber'
              label='Puhelin'
              value={this.state.data.phoneNumber}
              onChange={this.handleChange}></TextField>
          </Grid>
        </Grid>
        <Grid container justify='space-around'>
          <Grid style={{marginTop: '3vh'}} item xs={12} md={3}>
            <TextField
              fullWidth
              variant='outlined'
              name='email'
              label='Email'
              value={this.state.data.email}
              onChange={this.handleChange}></TextField>
          </Grid>
          <Grid style={{marginTop: '3vh'}} item xs={12} md={3}>
            <TextField
              fullWidth
              variant='outlined'
              name='potential'
              label='Potentiaali'
              value={this.state.data.potential}
              onChange={this.handleChange}></TextField>
          </Grid>
          <Grid style={{marginTop: '3vh'}} item xs={12} md={3}>
            <TextField
              fullWidth
              variant='outlined'
              name='notes'
              label='Huom'
              value={this.state.data.notes}
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

export default withRouter(EditLead);