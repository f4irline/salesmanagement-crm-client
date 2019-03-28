import React from 'react';

import './Tabs.css';
import NavItem from '../../../components/NavItem/NavItem';

import CalendarToday from '@material-ui/icons/CalendarToday';
import Person from '@material-ui/icons/Person';
import PhoneInTalk from '@material-ui/icons/PhoneInTalk';

const Tabs = (props) => {
  return (
    <div className='Tabs'>
      <div className='tabs-wrapper'>
        <NavItem url='/admin/users' icon={<Person />}>Käyttäjät</NavItem>
        <NavItem url='/admin/events' icon={<PhoneInTalk />}>Tapahtumat</NavItem>
        <NavItem url='/admin/leads' icon={<CalendarToday />}>Liidit</NavItem>
      </div>
    </div>
  );
};

export default Tabs;