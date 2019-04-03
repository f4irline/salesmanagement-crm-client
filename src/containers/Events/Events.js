import React from 'react';
import './Events.css';
import { Route } from 'react-router-dom';

import Drawer from '../../components/Drawer/Drawer.js';

//eslint-disable-next-line
import Tabs from './Tabs/Tabs';

import Contacts from './Contacts/Contacts';
import Leads from './Leads/Leads';
import Meetings from './Meetings/Meetings';
import Offers from './Offers/Offers';
import Sales from './Sales/Sales';

import Description from '@material-ui/icons/Description';
import EuroSymbol from '@material-ui/icons/EuroSymbol';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Person from '@material-ui/icons/Person';
import PhoneInTalk from '@material-ui/icons/PhoneInTalk';

const Events = (props) => {

  const eventLinks = [
    {
      url: '/events/leads',
      text: 'Liidit',
      icon: <Person />
    },
    {
      url: '/events/contacts',
      text: 'Yhteydenotot',
      icon: <PhoneInTalk />
    },
    {
      url: '/events/meetings',
      text: 'Tapaamiset',
      icon: <CalendarToday />
    },
    {
      url: '/events/offers',
      text: 'Tarjoukset',
      icon: <Description />
    },
    {
      url: '/events/sales',
      text: 'Myynnit',
      icon: <EuroSymbol />
    }
  ];

  return (
    <div className='Events'>
      { /*<Tabs /> */ }
      <Drawer drawerTitle={'Tapahtumat'} links={eventLinks}>
        <Route path='/events/contacts' render={() => <Contacts data={props.data[0]} />} />
        <Route path='/events/meetings' render={() => <Meetings data={props.data[1]} />} />
        <Route path='/events/offers' render={() => <Offers data={props.data[2]} />} />
        <Route path='/events/sales' render={() => <Sales data={props.data[3]} />} />
        <Route path='/events/leads' render={() => <Leads data={props.data[4]} />} />
      </Drawer>
    </div>
    
  );
};

export default Events;
