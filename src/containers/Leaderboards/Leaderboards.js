import React from 'react';
import { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import users from '../../placeholders/users.json'; 
import './Leaderboards.css';

class Leaderboards extends Component {
  
  render() {
    const data = users.users;
    const columns = [{
      Header: 'Name',
      accessor: 'user_name'
    },{
      Header: 'Role',
      accessor: 'role'
    },{
      Header: 'User ID',
      accessor: 'user_id'
    },{
      Header: 'Last Login',
      accessor: 'last_login'
    }];

    return (
      <div className="content" id="table">
        <ReactTable
          data={data}
          columns={columns}
          defaultPageSize = {10}
          pageSizeOptions = {[10, 20]}
        />
      </div>      
    );

  }
}

export default Leaderboards;
