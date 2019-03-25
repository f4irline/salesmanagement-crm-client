import React from 'react';

import './Tabs.css';
import NavItem from '../../components/NavItem/NavItem';
import ActionItem from '../../components/ActionItem/ActionItem';

import Description from '@material-ui/icons/Description';
import EuroSymbol from '@material-ui/icons/EuroSymbol';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Person from '@material-ui/icons/Person';
import PhoneInTalk from '@material-ui/icons/PhoneInTalk';

const Tabs = (props) => {
  return (
    <div className='Navigation'>
      <div className='navigation-wrapper'>
        <NavItem url='/leads' icon={<Person />}>Liidit</NavItem>
        <NavItem url='/contacts' icon={<PhoneInTalk />}>Yhteydenotot</NavItem>
        <NavItem url='/meetings' icon={<CalendarToday />}>Tapaamiset</NavItem>
        <NavItem url='/offers' icon={<Description />}>Tarjoukset</NavItem>
        <NavItem url='/sales' icon={<EuroSymbol />}>Kaupat</NavItem>
      </div>
    </div>
  );
};

export default Tabs;