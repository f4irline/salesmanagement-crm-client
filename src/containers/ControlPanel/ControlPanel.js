import React from 'react';
import './ControlPanel.css';
import {Switch, Route} from 'react-router-dom';

import Drawer from '../../components/Drawer/Drawer.js';

import CalendarToday from '@material-ui/icons/CalendarToday';
import Person from '@material-ui/icons/Person';
import PhoneInTalk from '@material-ui/icons/PhoneInTalk';
import DoneAll from '@material-ui/icons/DoneAll';

import EventData from './EventData/EventData';
import LeadData from './LeadData/LeadData';
import UserData from './UserData/UserData';

import MenuItem from '@material-ui/core/MenuItem';
import GoalsData from './GoalsData/GoalsData';


const months = {
  Tammikuu: 1,
  Helmikuu: 2,
  Maaliskuu: 3,
  Huhtikuu: 4,
  Toukokuu: 5,
  Kesäkuu: 6,
  Heinäkuu: 7,
  Elokuu: 8,
  Syyskuu: 9,
  Lokakuu: 10,
  Marraskuu: 11,
  Joulukuu: 12,
};

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
    },
    {
      url: '/admin/goals',
      text: 'Tavoitteet',
      icon: <DoneAll />
    },
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

  const mapMonthItems = () => {
    return Object.keys(months).map(month => {
      return <MenuItem key={month} value={month}>{month}</MenuItem>;
    });
  };

  const leadNames = mapLeadNames();
  const roleNames = mapRoleNames();
  const monthItems = mapMonthItems();

  return (
    <div className='ControlPanel'>
      <Drawer drawerTitle={'Hallinta'} links={adminLinks}>
        <Switch>
          <Route path='/admin/users' render={() => <UserData update={props.update} data={props.data[0]} roleNames={roleNames} user_id={props.user_id} />} />
          <Route path='/admin/leads' render={() => <LeadData update={props.update} data={props.data[1]} />} />
          <Route path='/admin/events' render={() => <EventData update={props.update} data={props.data[2]} leadNames={leadNames} />} />
          <Route path='/admin/goals' render={() => <GoalsData months={months} monthItems={monthItems} update={props.update} data={props.data[3]} /> } />
        </Switch>
      </Drawer>
    </div>
  );
};

export default ControlPanel;