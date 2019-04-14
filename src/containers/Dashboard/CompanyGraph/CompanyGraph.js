import React, { PureComponent } from 'react';
import './CompanyGraph.css';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';

import {daysBetween} from '../../../utils/Date';

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
  }

  checkWindowSize() {
    try {
      const height = this.chartWrapper.clientHeight;
      const width = this.chartWrapper.clientWidth;  
      
      if (height !== this.state.height || width !== this.state.width) {
        this.setState({height: height, width: width});
      }
    } catch (err) {
      return;
    }  
  }
  
  onChange(event) {
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
    return (
      <Grid item xs={12} lg={11} className='CompanyGraph' style={{minHeight: '44vh'}}>
        <div className='company-chart-header'>
          <Typography variant='h3' style={{fontWeight: 800}}>
            YRITYKSEN TAVOITE
          </Typography>
        </div>
        <div className='company-chart-wrapper' ref={(chartWrapper) => this.chartWrapper = chartWrapper}>
          <Typography variant='h5'>
            Myynti: {this.state.data[this.state.data.length-1].sum.toFixed(2)} € (Tavoite: {this.state.data[this.state.data.length-1].goal.toFixed(2)} €)
          </Typography>
          <TextField className='date'
            id='startDate'
            label='Aloitus päivämäärä'
            type='date'
            placeholder='dd.mm.yyyy'
            defaultValue={this.state.startDate}
            style={{margin: 0}}
            required
            InputLabelProps={{
              shrink: true,
            }}
            SelectProps={null}
            onChange={this.onChange}
          />
          <TextField className='date'
            id='endDate'
            label='Lopetus päivämäärä'
            type='date'
            placeholder='dd.mm.yyyy'
            defaultValue={this.state.endDate}
            style={{margin: 0}}
            required
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
              top: this.state.height / 100 * 5, right: this.state.width / 100 * 10, left: this.state.width / 100 * 10, bottom: this.state.height / 100 * 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" height={60} interval={0} tick={<CustomizedAxisTick days={daysBetween(this.state.startDate, this.state.endDate)} index />} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sum" stroke="#8884d8" label={<CustomizedLabel days={daysBetween(this.state.startDate, this.state.endDate)} index/>} dot={<CustomizedDot days={daysBetween(this.state.startDate, this.state.endDate)} color={'#0000FF'} index />} />
            <Line connectNulls type="monotone" dataKey="goal" stroke="red" label={<CustomizedLabel days={daysBetween(this.state.startDate, this.state.endDate)} index/>} dot={<CustomizedDot days={daysBetween(this.state.startDate, this.state.endDate)} color={'#FF0000'} index />} />
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
    let amount = Math.floor(this.props.days / 4);
    if ((this.props.index % amount === 0 && this.props.index + amount <= this.props.days) || this.props.index === this.props.days) {
      return (
        <circle r="3" stroke={color} strokeWidth="1" fill="#fff" width="543.2" height="147.1" className="recharts-dot recharts-line-dot" cx={cx} cy={cy}></circle>
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
    let amount = Math.floor(this.props.days / 4);
    if ((this.props.index % amount === 0 && this.props.index + amount <= this.props.days && this.props.index >= amount) || this.props.index === this.props.days) {
      return <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">{value.toFixed(2)} €</text>;
    }

    return null;
  }
}
class CustomizedAxisTick extends PureComponent {

  render() {
    const {
      x, y, payload,
    } = this.props;
    let amount = Math.floor(this.props.days / 4);
    if ((this.props.index % amount === 0 && this.props.index + amount <= this.props.days) || this.props.index === this.props.days)  {
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