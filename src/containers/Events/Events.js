import React from 'react';
import './Events.css';
import {Switch, Route} from 'react-router-dom';
import Tabs from '../../containers/Tabs/Tabs';

import Contacts from './Contacts/Contacts';
import Leads from './Leads/Leads';
import Meetings from './Meetings/Meetings';
import Offers from './Offers/Offers';
import Sales from './Sales/Sales';

const Events = (props) => {
  return (
    <div className='Events'>
      <Tabs/>
      <Switch>
        <Route path='/events/contacts' render={() => <Contacts data={props.data[0]} />} />
        <Route path='/events/meetings' render={() => <Meetings data={props.data[1]} />} />
        <Route path='/events/offers' render={() => <Offers data={props.data[2]} />} />
        <Route path='/events/sales' render={() => <Sales data={props.data[3]} />} />
        <Route path='/events/leads' render={() => <Leads data={props.data[4]} />} />
      </Switch>
    </div>
    
  );
};

export default Events;
