import React from 'react';
import './ControlPanel.css';
import {Switch, Route} from 'react-router-dom';
import Tabs from './Tabs/Tabs';

import EventData from './EventData/EventData';
import LeadData from './LeadData/LeadData';
import UserData from './UserData/UserData';

const ControlPanel = (props) => {
  return (
    <div className='Events'>
      <Tabs/>
      <Switch>
        <Route path='/admin/users' render={() => <UserData update={props.update} data={props.data[0]} />} />
        <Route path='/admin/leads' render={() => <LeadData update={props.update} data={props.data[1]} />} />
        <Route path='/admin/events' render={() => <EventData update={props.update} data={props.data[2]} />} />
      </Switch>
    </div>
  );
};

export default ControlPanel;