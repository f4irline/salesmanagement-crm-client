import React from 'react';
import { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import leaderboards from '../../placeholders/leaderboards.json'; 
import './Leaderboards.css';

class Leaderboards extends Component {
  
  render() {
    const data = leaderboards.leaderboards;
    const columns = [{
      Header: 'Name',
      accessor: 'user_first'
    },{
      Header: 'Hit rate %',
      accessor: 'hit_rate'
    },{
      Header: 'Average sales',
      accessor: 'avg_sales'
    },{
      Header: 'Total sales',
      accessor: 'total_sales'
    },{
      Header: 'Deals',
      accessor: 'deals_amount'
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
