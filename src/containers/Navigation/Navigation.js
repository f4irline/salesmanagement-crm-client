import React from 'react';

import './Navigation.css';
import NavItem from '../../components/NavItem/NavItem';
import ActionItem from '../../components/ActionItem/ActionItem';

import Settings from '@material-ui/icons/Settings';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Dashboard from '@material-ui/icons/Dashboard';
import TableChart from '@material-ui/icons/TableChart';

const Navigation = (props) => {
  return (
    <div className='Navigation'>
      <div className='navigation-wrapper'>
        <NavItem url='/'>{<Dashboard/>}Dashboard</NavItem>
        <NavItem url='/leaderboards'>{<TableChart/>}Leaderboards</NavItem>
      </div>
      <div className='action-wrapper'>
        <ActionItem name = 'Configuration' icon = {<Settings/>} onClick = {props.handleConfiguration}/>
        <ActionItem name = 'Logout' icon = {<ExitToApp/>} onClick = {props.handleLogout}/>
      </div>
    </div>
  );
};

export default Navigation;