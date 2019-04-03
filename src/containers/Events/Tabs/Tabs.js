import React from 'react';

import './Tabs.css';
import NavItem from '../../../components/NavItem/NavItem';

import Description from '@material-ui/icons/Description';
import EuroSymbol from '@material-ui/icons/EuroSymbol';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Person from '@material-ui/icons/Person';
import PhoneInTalk from '@material-ui/icons/PhoneInTalk';

const Tabs = (props) => {
  return (
    <div className='Tabs'>
      <div className='tabs-wrapper'>
        <NavItem url='/events/leads' icon={<Person />}>Liidit</NavItem>
        <NavItem url='/events/contacts' icon={<PhoneInTalk />}>Yhteydenotot</NavItem>
        <NavItem url='/events/meetings' icon={<CalendarToday />}>Tapaamiset</NavItem>
        <NavItem url='/events/offers' icon={<Description />}>Tarjoukset</NavItem>
        <NavItem url='/events/sales' icon={<EuroSymbol />}>Kaupat</NavItem>
      </div>
    </div>
  );
};

export default Tabs;