import React from 'react';

import './Footer.css';

const Footer = (props) => {
  return (
    <div className='Footer'>
      <p className='logo'>Value Creative</p>
      <p className='user'>Logged in as: Foo Bar</p>
    </div>
  );
};

export default Footer;