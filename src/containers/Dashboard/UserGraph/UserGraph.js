import React, { PureComponent } from 'react';

import Grid from '@material-ui/core/Grid';

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
    const height = this.divElement.clientHeight;
    const width = this.divElement.clientWidth;
    this.setState({height: height, width: width});
    window.addEventListener('resize', this.checkWindowSize.bind(this));
    print('UserGraph', 'componentDidMount', `width: ${width}, height: ${height}`);
  }

  checkWindowSize() {
    const height = this.divElement.clientHeight;
    const width = this.divElement.clientWidth;
    if (height !== this.state.height || width !== this.state.width) {
      this.setState({height: height, width: width});
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
      <Grid item xs={12} lg={6} className='UserGraph' style={{minHeight: '46vh'}}>
        <div className='chart-wrapper' ref={(divElement) => this.divElement = divElement}>
          <PieChart width={this.state.width} height={this.state.height} onMouseEnter={this.onPieEnter}>
            <Pie
              data={data}
              innerRadius={'70%'}
              outerRadius={'90%'}
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