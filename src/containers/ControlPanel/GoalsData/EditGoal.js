import React, { Component } from 'react';

import {withRouter} from 'react-router-dom';
import axios from '../../../axios-options';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Loading from '../../../components/Loading/Loading';
import { FormControl, Select, OutlinedInput } from '@material-ui/core';

class EditUser extends Component {

  state = {
    data: {},
    month: undefined,
    loading: false,
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const jwt = sessionStorage.getItem('accessToken');

    const { id } = this.props.match.params;
    this.setState({loading: true}, () => {
      axios.get(`companyGoals/get/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      })
        .then((res) => { 
          this.setState({data: res.data, loading: false}, () => {
            this.setState({month: this.props.monthItems[res.data.yearMonth.split('-')[1].replace('0', '') - 1].key});
          });
        })
        .catch(err => console.error(err));
    });
  }

  handleChange = (e) => {
    if (e.target.name !== 'year' && e.target.name !== 'month') {
      this.setState({
        data: Object.assign({}, this.state.data, {[e.target.name]: e.target.value})
      });  
    } else {
      let yearMonth = '';
      switch (e.target.name) {
      case 'year':
        yearMonth = `${e.target.value}-${this.state.data.yearMonth.split('-')[1]}`;
        break;
      case 'month':
        yearMonth = this.monthChange(e);
        break;
      default:
        break;
      }
      this.setState({
        data: Object.assign({}, this.state.data, {yearMonth: yearMonth})
      });
    }
  }
  
  monthChange = (e) => {
    let yearMonth = `${this.state.data.yearMonth.split('-')[0]}-${this.props.months[e.target.value]}`;

    if (this.props.months[e.target.value] < 10)  {
      yearMonth = `${this.state.data.yearMonth.split('-')[0]}-0${this.props.months[e.target.value]}`;
    }

    this.setState({
      month: e.target.value,
    });

    return yearMonth;
  }

  handleSave = () => {
    const jwt = sessionStorage.getItem('accessToken');
    const options = {
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    };

    axios.put('/admin/companyGoals/edit', this.state.data, options)
      .then((res) => {
        this.props.update();
        this.props.history.push('/admin/goals');
      })
      .catch(err => console.error(err));
  }

  render() {
    if (this.state.loading || !this.state.month || !this.state.data.yearMonth) {
      return (
        <Loading />
      );
    }

    return (
      <Grid container direction='column' alignItems='center'>
        <Grid item xs={11} style={{textAlign: 'center', marginTop: '5vh'}}>
          <Typography variant='h4' gutterBottom>
            TAVOITTEEN MUOKKAUS
          </Typography>
        </Grid>
        <Grid container justify='space-around'>
          <Grid style={{marginTop: '3vh'}} item xs={11}>
            <TextField
              fullWidth
              variant='outlined'
              label='Tavoitteen ID'
              defaultValue={this.state.data.companyGoalId}
              disabled></TextField>
          </Grid>
          <Grid style={{marginTop: '3vh'}} item xs={11}>
            <FormControl className='content-item' fullWidth>
              <Select
                name='month'
                value={this.state.month}
                onChange={this.handleChange}
                input={
                  <OutlinedInput
                    name='month'
                    labelWidth={0}
                  />
                }
                required>
                {this.props.monthItems}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container justify='space-around'>
          <Grid style={{marginTop: '3vh'}} item xs={11}>
            <TextField
              fullWidth
              variant='outlined'
              name='year'
              required
              label='Vuosi'
              defaultValue={this.state.data.yearMonth.split('-')[0]}
              onChange={this.handleChange}></TextField>
          </Grid>
          <Grid style={{marginTop: '3vh'}} item xs={11}>
            <TextField
              fullWidth
              variant='outlined'
              name='monthlyGoal'
              required
              label='Tavoite'
              type='number'
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