import React from 'react';

import './Footer.css';

const Footer = (props) => {
  return (
    <div className='Footer'>
      <p className='logo'>Value Creative</p>
      <p className='user'>Logged in as: {props.name}</p>
    </div>
  );
};

export default Footer;