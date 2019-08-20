import React from 'react';
import './Events.css';
import { Route } from 'react-router-dom';

import Drawer from '../../components/Drawer/Drawer.js';

import Contacts from './Contacts/Contacts';
import Leads from './Leads/Leads';
import Meetings from './Meetings/Meetings';
import Offers from './Offers/Offers';
import Sales from './Sales/Sales';
import Closed from './Closed/Closed';

import Description from '@material-ui/icons/Description';
import EuroSymbol from '@material-ui/icons/EuroSymbol';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Person from '@material-ui/icons/Person';
import PhoneInTalk from '@material-ui/icons/PhoneInTalk';
import Clear from '@material-ui/icons/Clear';
import EditEvent from '../ControlPanel/EventData/EditEvent';
import { MenuItem } from '@material-ui/core';

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
    },
    {
      url: '/events/closed',
      text: 'Suljetut',
      icon: <Clear />
    }
  ];

  const mapLeadNames = () => {
    const leadNames = props.leads.map(lead => {
      return <MenuItem key={lead.companyName} value={lead.companyName}>{lead.companyName}</MenuItem>;
    });

    return leadNames;
  };

  const leadNames = mapLeadNames();

  return (
    <div className='Events'>
      <Drawer drawerTitle={'Tapahtumat'} links={eventLinks}>
        <Route path='/events/contacts' render={() => <Contacts userId={props.userId} data={props.data[0]} />} />
        <Route path='/events/meetings' render={() => <Meetings userId={props.userId} data={props.data[1]} />} />
        <Route path='/events/offers' render={() => <Offers userId={props.userId} data={props.data[2]} />} />
        <Route path='/events/sales' render={() => <Sales userId={props.userId} data={props.data[3]} />} />
        <Route path='/events/leads' render={() => <Leads userId={props.userId} data={props.data[4]} />} />
        <Route path='/events/closed' render={() => <Closed userId={props.userId} data={props.data[5]} />} />
        <Route path='/events/edit/:id' render={() => 
          <EditEvent admin={false} update={props.update} leadNames={leadNames} />
        } />
      </Drawer>
    </div>
    
  );
};

export default Events;
