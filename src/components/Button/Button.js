import React from 'react';
import './Button.css';

const Button = (props) => {

  let classes = 'Button ' + props.type;
  console.log(classes);

  return (
    <div className={classes}>
      <p>{props.children}</p>
    </div>
  )
}

export default Button;