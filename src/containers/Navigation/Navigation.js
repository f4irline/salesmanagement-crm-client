import React from 'react';

import './Navigation.css';
import NavItem from '../../components/NavItem/NavItem';
import ActionItem from '../../components/ActionItem/ActionItem';

const Navigation = (props) => {
  return (
    <div className='Navigation'>
      <div className='navigation-wrapper'>
        <NavItem url='/'>Dashboard</NavItem>
        <NavItem url='/leaderboards'>Leaderboards</NavItem>
      </div>
      <div className='action-wrapper'>
        <ActionItem />
        <ActionItem />
      </div>
    </div>
  );
};

export default Navigation;