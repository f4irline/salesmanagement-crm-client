import React from 'react';
import './ControlPanel.css';
import {Switch, Route} from 'react-router-dom';
import Tabs from './Tabs/Tabs';

import EventData from './EventData/EventData';
import LeadData from './LeadData/LeadData';
import UserData from './UserData/UserData';

import MenuItem from '@material-ui/core/MenuItem';

const ControlPanel = (props) => {

  const mapLeadNames = () => {
    const leadNames = props.data[1].map(lead => {
      return <MenuItem key={lead.companyName} value={lead.companyName}>{lead.companyName}</MenuItem>;
    });

    return leadNames;
  };

  const leadNames = mapLeadNames();

  return (
    <div className='Events'>
      <Tabs/>
      <Switch>
        <Route path='/admin/users' render={() => <UserData leadNames={leadNames} user_id={props.user_id} update={props.update} data={props.data[0]} />} />
        <Route path='/admin/leads' render={() => <LeadData update={props.update} data={props.data[1]} />} />
        <Route path='/admin/events' render={() => <EventData update={props.update} leadNames={leadNames} data={props.data[2]} />} />
      </Switch>
    </div>
  );
};

export default ControlPanel;