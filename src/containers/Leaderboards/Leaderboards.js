import React from 'react';
import { Component } from 'react';
import MUIDataTable from 'mui-datatables';
import leaderboards from '../../placeholders/leaderboards.json'; 
import TextField from '@material-ui/core/TextField';
import './Leaderboards.css';

class Leaderboards extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate:null,
      endDate:null
    };
  }

  onChange(event) {
    console.log(event.target.value);
    console.log(event.target.id);
  }

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
    const columns = [
      {
        name: 'Name',
        options: {
          filter: true,
          sort: true,
          filterOptions: newData.map((key) => {
            return key[0];
          })
        }
      },
      {
        name: 'Hit rate %',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Average sales',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Total sales',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Contact amount',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Meeting amount',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Offer amount',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Deal amount',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Date',
        options: {
          filter: true,
          sort: true,
        }
      }
    ];
    const options = {
      filterType: 'multiselect',
      selectableRows: false,
    };
    return (
      <div className="content Leaderboards">
        <form className="datePicker">
          <TextField className="date"
            id="startDate"
            label="Start Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.onChange}
          />
          <TextField className="date"
            id="endDate"
            label="End Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.onChange}
          />
        </form>
        <div id="table">
          <MUIDataTable
            title={'Leaderboards'}
            data={newData}
            columns={columns}
            options={options}
          />
        </div>  
      </div>
     
    );

  }
}

export default Leaderboards;
