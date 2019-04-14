import React from 'react';
import './Button.css';

const Button = (props) => {

  let classes = 'Button ' + props.type;

  return (
    <div className={classes}>
      <p>{props.children}</p>
    </div>
  );
};

export default Button;