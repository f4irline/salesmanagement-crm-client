import React, { PureComponent } from 'react';
import { Component } from 'react';

import Grid from '@material-ui/core/Grid';

import './UserGraph.css';

import {
  PieChart, Pie, Sector, Cell,
} from 'recharts';

class UserGraph extends Component {
  constructor(props) {
    super(props);
    console.log('UserData constructor');
    this.state = {user: props.user, name: props.name, userData: props.userData};
  }

  render() {
    console.log('UserData render');

    const data = [
      { name: 'Group A', value: (this.state.userData.goal - this.state.userData.total_sales) },
      { name: 'Group B', value: this.state.userData.total_sales },
    ];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
      <Grid item xs={12} lg={6} className='UserGraph'>
        <p>Usergraph</p>
        <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
          <Pie
            data={data}
            cx={120}
            cy={200}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {
              data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
            }
          </Pie>
        </PieChart>
      </Grid>
    );
  }
}

export default UserGraph;