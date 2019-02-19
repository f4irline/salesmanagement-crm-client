import React from 'react';

import './ActionItem.css';


const ActionItem = (props) => {
  return (
    <div onClick = {props.onClick} className='ActionItem'>
      {props.icon}<p className='item'>{props.children}</p>
    </div>
  );
};

export default ActionItem;