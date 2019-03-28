import React from 'react';
import { Component } from 'react';
import './ControlPanel.css';
import {Switch, Route} from 'react-router-dom';
import Tabs from './Tabs/Tabs';

import {print} from '../../utils/Debug';

import EventData from './EventData/EventData';
import LeadData from './LeadData/LeadData';
import UserData from './UserData/UserData';

class ControlPanel extends Component {
  state = {
    data: []
  }

  componentDidMount() {
    this.setState({data: this.props.data});
  }

  onChange = this.onChange.bind(this);

  onChange(event) {

    print('ControlPanel', 'onChange');

  }

  render() {

    print ('ControlPanel', 'render');

    return (

      <div className='Events'>
        <Tabs/>
        <Switch>
          <Route path='/admin/users' render={() => <UserData data={this.state.data[0]} />} />
          <Route path='/admin/events' render={() => <EventData data={this.state.data[1]} />} />
          <Route path='/admin/leads' render={() => <LeadData data={this.state.data[2]} />} />
        </Switch>
      </div>

    );

  }
}

export default ControlPanel;