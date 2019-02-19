import React from 'react';

import { NavLink } from 'react-router-dom';
import './NavItem.css';

const NavItem = (props) => {
  return (
    <div className='NavItem'>
      <NavLink to={props.url} exact>{props.icon}<p className='item'>{props.children}</p></NavLink>
    </div>
  );
};

export default NavItem;