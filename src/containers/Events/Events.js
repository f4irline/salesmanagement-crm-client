import React from 'react';
import { Component } from 'react';
import './Events.css';
import {Switch, Route} from 'react-router-dom';
import Tabs from '../../containers/Tabs/Tabs';

import Contacts from './Contacts/Contacts';
import Leads from './Leads/Leads';
import Meetings from './Meetings/Meetings';
import Offers from './Offers/Offers';
import Sales from './Sales/Sales';

import {print} from '../../utils/Debug';

class Events extends Component {
  state = {
    startDate: new Date('foo'),
    endDate: new Date('foo'),
    data: []
  }

  componentDidMount() {
    print('Events', 'componentDidMount');
    this.setState({data: this.props.data});
  }

  
  render() {

    print ('Events', 'render');

    if (this.state.loading) {
      return (
        <div className='Events'>
          <p>Loading...</p>
        </div>
      );
    }

    console.log('userEvents: ' + this.state.data[0]);
    return (
      <div className='Events'>
        <Tabs/>
        <Switch>
          <Route path='/contacts' render={() => <Contacts data={this.state.data[0]} />} />
          <Route path='/meetings' render={() => <Meetings data={this.state.data[1]} />} />
          <Route path='/offers' render={() => <Offers data={this.state.data[2]} />} />
          <Route path='/sales' render={() => <Sales data={this.state.data[3]} />} />
          <Route path='/leads' render={() => <Leads data={this.state.data[4]} />} />
        </Switch>
      </div>
     
    );

  }
}

export default Events;
