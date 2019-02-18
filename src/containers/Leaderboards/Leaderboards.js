import React from 'react';
import { Component } from 'react';
import MUIDataTable from 'mui-datatables';
import leaderboards from '../../placeholders/leaderboards.json'; 
import './Leaderboards.css';

class Leaderboards extends Component {

  convertData(data) {
    let newData = [];
    newData = data.map((object) => {
      let rowData = [];
      let fullName = '';
      for (let data in object) {
        if (data === 'user_first') {
          fullName += object[data]+' ';
        } else if (data === 'user_last') {
          fullName += object[data];
          rowData.push(fullName);
        } else {
          rowData.push(object[data]);
        }
      }
      return rowData;
    });

    return newData;
  }
  
  render() {
    const data = leaderboards.leaderboards;   
    const newData = this.convertData(data); 
    console.log(newData);
    const columns = [

      {
        name: 'Name',
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: 'Hit rate %',
        options: {
          filter: true,
          sort: false,
        }
      },
      {
        name: 'Average sales',
        options: {
          filter: true,
          sort: false,
        }
      },
      {
        name: 'Total sales',
        options: {
          filter: true,
          sort: false,
        }
      },
      {
        name: 'Contact amount',
        options: {
          filter: true,
          sort: false,
        }
      },
      {
        name: 'Meeting amount',
        options: {
          filter: true,
          sort: false,
        }
      },
      {
        name: 'Offer amount',
        options: {
          filter: true,
          sort: false,
        }
      },
      {
        name: 'Deal amount',
        options: {
          filter: true,
          sort: false,
        }
      },
      {
        name: 'Date',
        options: {
          filter: true,
          sort: false,
        }
      }
    ];
    const options = {
      filtertype: 'dropdown'
    };
    return (
      <div className="content" id="table">
        <MUIDataTable
          title={'Leaderboards'}
          data={newData}
          columns={columns}
          options={options}
        />
      </div>      
    );

  }
}

export default Leaderboards;
