import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Paper, FormControl, Select, OutlinedInput } from '@material-ui/core';

import axios from '../../../../axios-options';

class CreateGoal extends Component {
  state = {
    yearMonth: 'year-month',
    month: 'JOULUKUU',
    monthlyGoal: undefined,
  }

  handleCreate = () => {
    const jwt = sessionStorage.getItem('accessToken');
    const options = {
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    };

    axios.post('/companyGoals', this.state, options)
      .then((res) => {
        this.props.update();
        this.props.history.push('/admin/goals');
      });
  }

  handleChange = (e) => {
    if (e.target.name === 'monthlyGoal') {
      this.setState({[e.target.name]: e.target.value});
    } else {
      let yearMonth = '';
      switch (e.target.name) {
      case 'year':
        yearMonth = `${e.target.value}-${this.state.yearMonth.split('-')[1]}`;
        break;
      case 'month':
        yearMonth = this.monthChange(e);
        break;
      default:
        break;
      }
      this.setState({
        yearMonth: yearMonth,
      });
    }
  }

  monthChange = (e) => {
    let yearMonth = `${this.state.yearMonth.split('-')[0]}-${this.props.months[e.target.value]}`;

    if (this.props.months[e.target.value] < 10)  {
      yearMonth = `${this.state.yearMonth.split('-')[0]}-0${this.props.months[e.target.value]}`;
    }

    this.setState({
      month: e.target.value,
    });

    return yearMonth;
  }

  render() {
    return (
      <Paper style={{padding: '1vw'}}>
        <Grid container direction='column' alignItems='center'>
          <Grid item xs={11} style={{textAlign: 'center', marginTop: '5vh'}}>
            <Typography variant='h4' gutterBottom>
              TAVOITTEEN LUONTI
            </Typography>
          </Grid>
          <Grid container justify='space-around'>
            <Grid style={{marginTop: '3vh'}} item xs={11} md={5}>
              <TextField
                fullWidth
                variant='outlined'
                name='year'
                type='number'
                required
                label='Vuosi'
                onChange={this.handleChange}></TextField>
            </Grid>
            <Grid style={{marginTop: '3vh'}} item xs={11} md={5}>
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
            <Grid style={{marginTop: '3vh'}} item xs={11} md={11}>
              <TextField
                fullWidth
                variant='outlined'
                name='monthlyGoal'
                required
                label='Tavoite'
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

export default withRouter(CreateGoal);