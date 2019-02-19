import React from 'react';

import './Navigation.css';
import NavItem from '../../components/NavItem/NavItem';
import ActionItem from '../../components/ActionItem/ActionItem';

import Settings from '@material-ui/icons/Settings';
import ExitToApp from '@material-ui/icons/ExitToApp';

const Navigation = (props) => {
  return (
    <div className='Navigation'>
      <div className='navigation-wrapper'>
        <NavItem url='/'>Dashboard</NavItem>
        <NavItem url='/leaderboards'>Leaderboards</NavItem>
      </div>
      <div className='action-wrapper'>
        <ActionItem name = 'configuration' icon = {<Settings/>}/>
        <ActionItem name = 'logout' icon = {<ExitToApp/>} onLogout = {props.onLogout}/>
      </div>
    </div>
  );
};

export default Navigation;