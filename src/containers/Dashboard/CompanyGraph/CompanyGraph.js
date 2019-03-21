import React, { PureComponent } from 'react';
import './CompanyGraph.css';

import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';

import axios from '../../../axios-options';

import {print} from '../../../utils/Debug';

/* eslint-disable react/no-multi-comp */
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

class CustomizedLabel extends PureComponent {
  render() {
    const {
      x, y, stroke, value,
    } = this.props;

    return <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">{value}</text>;
  }
}

class CustomizedAxisTick extends PureComponent {
  render() {
    const {
      x, y, stroke, payload,
    } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
      </g>
    );
  }
}

class CompanyGraph extends PureComponent {
  
  state = {
    name: this.props.name,
    user: {},
    startDate: this.getCurrentDate(false),
    endDate: this.getCurrentDate(true),
    loading: true,
    data: []
  }
  onChange = this.onChange.bind(this);
  getData = this.getData.bind(this);
  
  componentDidMount() {
    this.getData();
  }

  getCurrentDate(nextMonth) {

    let newDate = new Date();

    newDate.setMonth(newDate.getMonth() + 1);

    if (nextMonth) {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    
    return `${newDate.getFullYear()}-${newDate.getMonth()<10?`0${newDate.getMonth()}`:`${newDate.getMonth()}`}-01`;
  }

  onChange(event) {

    print('CompanyGraph', 'onChange');

    let value = event.target.value;
    let id = event.target.id;
    switch(id) {
    case 'startDate':
      this.setState({startDate: new Date(value).toISOString().slice(0, 10)}, () => {
        this.getData();
      });
      break;
    case 'endDate':
      this.setState({endDate: new Date(value).toISOString().slice(0, 10)}, () => {
        this.getData();
      });
      break;
    default:
      break;
    }
  }

  getData() {
    print('CompanyGraph', 'getData');
    let url_companyChart = `/companyChart/get/${this.state.startDate}/${this.state.endDate}`;
    console.log('CompanyGraph componenDidMount() url_companyChart: ' + url_companyChart);
    //let url_dummy ='/companyChart/get/2019-01-01/2019-03-21';
    axios.get(url_companyChart)
      .then(res => this.setState({data: res.data}, () => {
        this.setState({loading: false});
        console.log(this.state.data);
      }));
  }

  render() {
    print('CompanyGraph', 'render');

    if (this.state.loading) {
      return (
        <div className='Leaderboards'>
          <p>CompanyGraph</p>
          <form className='datePicker'>
            <TextField className='date'
              id='startDate'
              label='Aloitus päivämäärä'
              type='date'
              defaultValue={this.state.startDate}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.onChange}
            />
            <TextField className='date'
              id='endDate'
              label='Lopetus päivämäärä'
              type='date'
              defaultValue={this.state.endDate}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.onChange}
            />
          </form>
          <p>Loading...</p>
        </div>
      );
    }

    const data = this.state.data; 

    console.log('render() data:' + data);

    return (
      <Grid item xs={10} className='CompanyGraph' style={{minHeight: '46vh'}}>
        <p>CompanyGraph</p>
        <form className='datePicker'>
          <TextField className='date'
            id='startDate'
            label='Aloitus päivämäärä'
            type='date'
            defaultValue={this.state.startDate}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.onChange}
          />
          <TextField className='date'
            id='endDate'
            label='Lopetus päivämäärä'
            type='date'
            defaultValue={this.state.endDate}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.onChange}
          />
        </form>
        <LineChart
          width={1000}
          height={300}
          data={data}
          margin={{
            top: 20, right: 30, left: 20, bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" height={60} tick={<CustomizedAxisTick />} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sum" stroke="#8884d8" label={<CustomizedLabel />} />
          <Line connectNulls type="monotone" dataKey="goal" stroke="red" />
        </LineChart>
      </Grid>
    );
  }
}

export default CompanyGraph;