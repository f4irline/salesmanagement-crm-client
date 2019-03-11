import React from 'react';
import { Component } from 'react';
import './CompanyGraph.css';

class CompanyGraph extends Component {
  constructor(props) {
    super(props);
    console.log('UserData constructor');
    let user = {};
    this.state = {name: props.name, user: user};
  }

  render() {
    console.log('UserData render');
    return (
      <div className='CompanyGraph'>
        <p>CompanyGraph</p>
      </div>
    );
  }
}

export default CompanyGraph;