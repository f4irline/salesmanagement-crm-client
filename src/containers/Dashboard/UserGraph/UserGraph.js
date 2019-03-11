import React from 'react';
import { Component } from 'react';
import './UserGraph.css';

class UserGraph extends Component {
  constructor(props) {
    super(props);
    console.log('UserData constructor');
    let user = {};
    this.state = {name: props.name, user: user};
  }

  render() {
    console.log('UserData render');
    return (
      <div className='UserGraph'>
        <p>Usergraph</p>
      </div>
    );
  }
}

export default UserGraph;