import React, { PureComponent } from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import './UserGraph.css';

import {print} from '../../../utils/Debug';

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
      print('UserGraph', 'checkWindowSize', 'Reloading Div');
    }
  }

  render() {
    print('UserGraph', 'render');
    
    let padding = 5;
    let toGoal = this.props.goal - this.props.sales;

    const data = [
      { name: 'Group A', value: this.props.sales }
    ];

    if (toGoal > 0) {
      data.push({ name: 'Group B', value: toGoal });
    } else {
      toGoal = 0;
      padding = 0;
    }

    const COLORS = ['#D72322', '#222C35'];

    return (
      <Grid item xs={12} lg={5} className='UserGraph' style={{minHeight: '46vh'}}>
        <div className='chart-header'>
          <Typography variant='h2' style={{fontWeight: 800}}>
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
              label>
              {
                data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
              }
            </Pie>
          </PieChart>
        </div>
      </Grid>
    );
  }
}

export default UserGraph;