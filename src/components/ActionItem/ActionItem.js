import React from 'react';

import './ActionItem.css';


const ActionItem = (props) => {
  return (
    <div onClick = {props.onLogout} className='ActionItem'>
      {props.icon}
      <p className='item'>{props.name}</p>
    </div>
  );
};

export default ActionItem;