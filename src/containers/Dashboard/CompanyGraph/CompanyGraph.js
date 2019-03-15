import React, { PureComponent } from 'react';
import './CompanyGraph.css';

import Grid from '@material-ui/core/Grid';

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
    user: {}
  }

  render() {
    print('CompanyGraph', 'render');

    const data = [
      {
        name: '1.1.2019', uv: 4000, pv: 2400, goal: 0,
      },
      {
        name: '2.1.2019', uv: 3000, pv: 1398,
      },
      {
        name: '3.1.2019', uv: 2000, pv: 9800,
      },
      {
        name: '4.1.2019', uv: 2780, pv: 3908,
      },
      {
        name: '5.1.2019', uv: 1890, pv: 4800,
      },
      {
        name: '6.1.2019', uv: 2390, pv: 3800,
      },
      {
        name: '7.1.2019', uv: 3490, pv: 4300, goal: 9000,
      },
    ];

    return (
      <Grid item xs={10} className='CompanyGraph' style={{minHeight: '46vh'}}>
        <p>CompanyGraph</p>
        <LineChart
          width={1000}
          height={300}
          data={data}
          margin={{
            top: 20, right: 30, left: 20, bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" height={60} tick={<CustomizedAxisTick />} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" label={<CustomizedLabel />} />
          <Line connectNulls type="monotone" dataKey="goal" stroke="red" />
        </LineChart>
      </Grid>
    );
  }
}

export default CompanyGraph;