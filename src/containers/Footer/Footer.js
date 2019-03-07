import React from 'react';

import logo from '../../assets/images/logo-value-retina.png';

import './Footer.css';

const Footer = (props) => {
  return (
    <div className='Footer'>
      <div className='logo'>
        <img src={logo} alt='Value Creative'/>
      </div>
      <p className='user'>Logged in as: {props.name}</p>
    </div>
  );
};

export default Footer;