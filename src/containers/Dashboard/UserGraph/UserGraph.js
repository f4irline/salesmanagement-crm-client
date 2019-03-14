import React, { PureComponent } from 'react';

import Grid from '@material-ui/core/Grid';

import './UserGraph.css';

import {
  PieChart, Pie, Cell,
} from 'recharts';

class UserGraph extends PureComponent {
  constructor(props) {
    super(props);
    console.log('UserData constructor');
    this.state = {
      user: props.user, 
      name: props.name, 
      userData: props.userData, 
      height: 0, 
      width: 0
    };
  }

  componentDidMount() {
    const height = this.divElement.clientHeight;
    const width = this.divElement.clientWidth;
    this.setState({height: height, wiidth: width});
    window.addEventListener('resize', this.checkWindowSize.bind(this));
  }
  
  componentDidUpdate() {
    if (this.divElement.clientHeight !== this.state.height) {
      this.setState({height: this.divElement.clientHeight});
    } else if (this.divElement.clientWidth !== this.state.width) {
      this.setState({width: this.divElement.clientWidth});
    }
  }

  checkWindowSize() {
    const height = this.divElement.clientHeight;
    const width = this.divElement.clientWidth;
    this.setState({height: height, wiidth: width});
  }

  render() {
    console.log('UserData render');

    const data = [
      { name: 'Group A', value: (this.state.userData.goal - this.state.userData.total_sales) },
      { name: 'Group B', value: this.state.userData.total_sales },
    ];
    const COLORS = ['#222C35', '#D72322'];

    return (
      <Grid item xs={12} lg={6} className='UserGraph' style={{minHeight: '100%'}}>
        <div className='chart-wrapper' ref={(divElement) => this.divElement = divElement}>
          <PieChart width={this.state.width} height={this.state.height} onMouseEnter={this.onPieEnter}>
            <Pie
              data={data}
              innerRadius={'70%'}
              outerRadius={'90%'}
              paddingAngle={5}
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