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
        <NavItem url='/' icon={<Dashboard />}>Oma sivu</NavItem>
        <NavItem url='/leaderboards' icon={<TableChart />}>Tulostaulukko</NavItem>
      </div>
      <div className='action-wrapper'>
        <ActionItem icon = {<Settings/>} onClick = {props.handleConfiguration}>Hallinta</ActionItem>
        <ActionItem icon = {<ExitToApp/>} onClick = {props.handleLogout}>Kirjaudu ulos</ActionItem>
      </div>
    </div>
  );
};

export default Navigation;