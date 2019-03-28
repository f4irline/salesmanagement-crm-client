import React, { PureComponent } from 'react';
import './CompanyGraph.css';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';

import {print} from '../../../utils/Debug';

/* eslint-disable react/no-multi-comp */
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

class CompanyGraph extends PureComponent {
  
  state = {
    name: this.props.name,
    user: {},
    height: 0,
    width: 0,
    startDate: this.props.companyDates[0],
    endDate: this.props.companyDates[1],
    data: this.props.companyData,
    tickIndex: 0
  }

  onChange = this.onChange.bind(this);

  componentDidMount() {
    const height = this.chartWrapper.clientHeight;
    const width = this.chartWrapper.clientWidth;
    this.setState({height: height, width: width});
    window.addEventListener('resize', this.checkWindowSize.bind(this));
    print('UserGraph', 'componentDidMount', `width: ${width}, height: ${height}`);
  }

  checkWindowSize() {
    try {
      const height = this.chartWrapper.clientHeight;
      const width = this.chartWrapper.clientWidth;  
      
      if (height !== this.state.height || width !== this.state.width) {
        this.setState({height: height, width: width});
      }
    } catch (err) {
      print('CompanyGraph', 'checkWindowSize', 'Reloading Div');
    }  
  }
  
  onChange(event) {

    print('CompanyGraph', 'onChange');

    let value = event.target.value;
    let id = event.target.id;
    switch(id) {
    case 'startDate':
      this.setState({startDate: new Date(value).toISOString().slice(0, 10)}, () => {
        this.props.changeDate(this.state.startDate, this.state.endDate);
      });
      break;
    case 'endDate':
      this.setState({endDate: new Date(value).toISOString().slice(0, 10)}, () => {
        this.props.changeDate(this.state.startDate, this.state.endDate);
      });
      break;
    default:
      break;
    }
  }

  render() {
    print('CompanyGraph', 'render');
    
    return (
      <Grid item xs={12} lg={11} className='CompanyGraph' style={{minHeight: '46vh'}}>
        <div className='company-chart-header'>
          <Typography variant='h2' style={{fontWeight: 800}}>
            YRITYKSEN TAVOITE
          </Typography>
        </div>
        <div className='company-chart-wrapper' ref={(chartWrapper) => this.chartWrapper = chartWrapper}>
          <TextField className='date'
            id='startDate'
            label='Aloitus päivämäärä'
            type='date'
            defaultValue={this.state.startDate}
            style={{margin: 0}}
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
            style={{margin: 0}}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.onChange}
          />
          <LineChart
            width={this.state.width}
            height={this.state.height}
            data={this.state.data}
            margin={{
              top: 0, right: this.state.width / 100 * 10, left: this.state.width / 100 * 10, bottom: this.state.height / 100 * 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" height={60} interval={0} tick={<CustomizedAxisTick index />} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sum" stroke="#8884d8" label={<CustomizedLabel index/>} dot={<CustomizedDot color={'#0000FF'} index />} />
            <Line connectNulls type="monotone" dataKey="goal" stroke="red" dot={<CustomizedDot color={'#FF0000'} index />} />
          </LineChart>
        </div>
      </Grid>
    );
  }
}

class CustomizedDot extends PureComponent {
  render() {
    const {
      cx, cy, color,
    } = this.props;
  
    if (this.props.index % 3 === 0) {
      return (
        <circle r="3" stroke={color} stroke-width="1" fill="#fff" width="543.2" height="147.1" class="recharts-dot recharts-line-dot" cx={cx} cy={cy}></circle>
      );  
    }

    return null;
  }
}

class CustomizedLabel extends PureComponent {
  render() {
    const {
      x, y, stroke, value,
    } = this.props;
    
    if (this.props.index % 3 === 0) {
      return <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">{value}</text>;
    }

    return null;
  }
}
class CustomizedAxisTick extends PureComponent {

  render() {
    const {
      x, y, payload,
    } = this.props;

    if (this.props.index % 3 === 0) {
      return (
        <g transform={`translate(${x},${y})`}>
          <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
        </g>
      );    
    }

    return null;
  }
}

export default CompanyGraph;