import React from 'react';
import './ControlPanel.css';
import {Switch, Route} from 'react-router-dom';

import Drawer from '../../components/Drawer/Drawer.js';

import CalendarToday from '@material-ui/icons/CalendarToday';
import Person from '@material-ui/icons/Person';
import PhoneInTalk from '@material-ui/icons/PhoneInTalk';

import EventData from './EventData/EventData';
import LeadData from './LeadData/LeadData';
import UserData from './UserData/UserData';

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

  return (
    <div className='Events'>
      <Drawer drawerTitle={'Hallinta'} links={adminLinks}>
        <Switch>
          <Route path='/admin/users' render={() => <UserData data={props.data[0]} />} />
          <Route path='/admin/leads' render={() => <LeadData data={props.data[1]} />} />
          <Route path='/admin/events' render={() => <EventData data={props.data[2]} />} />
        </Switch>
      </Drawer>
    </div>
  );
};

export default ControlPanel;