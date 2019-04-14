import React, { PureComponent } from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import './UserGraph.css';

import {
  PieChart, Pie, Cell,
} from 'recharts';

class UserGraph extends PureComponent {
  state = {
    height: 0, 
    width: 0
  }

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

  render() {    
    let padding = 5;
    let toGoal = this.props.goal - this.props.sales;

    const data = [];

    let percent = Math.round(100*this.props.sales / this.props.goal);

    if (toGoal > 0) {
      data.push({ name: 'Group A', value: this.props.sales });
      data.push({ name: 'Group B', value: toGoal });
    } else {
      //let rpm = Math.floor(this.props.sales / this.props.goal);
      toGoal = 0;
      padding = 0;
      data.push({ name: 'Group A', value: this.props.sales });
      //data.push({ name: 'Group B', value: rpm });
    }

    const COLORS = ['#D72322', '#222C35'];

    return (
      <Grid item xs={12} lg={5} className='UserGraph' style={{minHeight: '44vh'}}>
        <div className='chart-header'>
          <Typography variant='h3' style={{fontWeight: 800}}>
            TAVOITTEESI
          </Typography>
        </div>
        <div className='chart-wrapper' ref={(chartWrapper) => this.chartWrapper = chartWrapper}>
          <PieChart width={this.state.width} height={this.state.height} onMouseEnter={this.onPieEnter}>
            <Pie
              data={data}
              innerRadius={'60%'}
              outerRadius={'80%'}
              paddingAngle={padding}
              dataKey="value"
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                value,
                index
              }) => {
                const RADIAN = Math.PI / 180;
                // eslint-disable-next-line
                const radius = 25 + innerRadius + (outerRadius - innerRadius);
                // eslint-disable-next-line
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                // eslint-disable-next-line
                const y = cy + radius * Math.sin(-midAngle * RADIAN);
      
                return (
                  <text
                    x={x}
                    y={y}
                    fill="#8884d8"
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                  >
                    {value.toFixed(2)} €
                  </text>
                );
              }}>
              {
                data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
              }
            </Pie>
            <text x={this.state.width / 2} y={this.state.height / 2} textAnchor="middle" dominantBaseline="middle">
              {percent} %
            </text>
          </PieChart>
        </div>
      </Grid>
    );
  }
}

export default UserGraph;