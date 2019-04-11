import React from 'react';
import './ControlPanel.css';
import {Switch, Route} from 'react-router-dom';

import Drawer from '../../components/Drawer/Drawer.js';

//eslint-disable-next-line
import Tabs from './Tabs/Tabs';

import CalendarToday from '@material-ui/icons/CalendarToday';
import Person from '@material-ui/icons/Person';
import PhoneInTalk from '@material-ui/icons/PhoneInTalk';

import EventData from './EventData/EventData';
import LeadData from './LeadData/LeadData';
import UserData from './UserData/UserData';

import MenuItem from '@material-ui/core/MenuItem';

const ControlPanel = (props) => {

  const adminLinks = [
    {
      url: '/admin/users',
      text: 'Käyttäjät',
      icon: <Person />
    },
    {
      url: '/admin/leads',
      text: 'Liidit',
      icon: <PhoneInTalk />
    },
    {
      url: '/admin/events',
      text: 'Tapahtumat',
      icon: <CalendarToday />
    }
  ];

  const mapLeadNames = () => {
    const leadNames = props.data[1].map(lead => {
      return <MenuItem key={lead.companyName} value={lead.companyName}>{lead.companyName}</MenuItem>;
    });

    return leadNames;
  };

  const mapRoleNames = () => {
    const roleNames = ['ROLE_ADMIN', 'ROLE_USER'].map(role => {
      return <MenuItem key={role} value={role}>{role}</MenuItem>;
    });

    return roleNames;
  };

  const leadNames = mapLeadNames();
  const roleNames = mapRoleNames();

  return (
    <div className='ControlPanel'>
      {/* <Tabs/> */}
      <Drawer drawerTitle={'Hallinta'} links={adminLinks}>
        <Switch>
          <Route path='/admin/users' render={() => <UserData update={props.update} data={props.data[0]} roleNames={roleNames} user_id={props.user_id} />} />
          <Route path='/admin/leads' render={() => <LeadData update={props.update} data={props.data[1]} />} />
          <Route path='/admin/events' render={() => <EventData update={props.update} data={props.data[2]} leadNames={leadNames} />} />
        </Switch>
      </Drawer>
    </div>
  );
};

export default ControlPanel;