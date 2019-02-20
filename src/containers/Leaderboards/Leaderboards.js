import React from 'react';
import { Component } from 'react';
import MUIDataTable from 'mui-datatables';
import leaderboards from '../../placeholders/leaderboards.json'; 
import TextField from '@material-ui/core/TextField';
import './Leaderboards.css';

class Leaderboards extends Component {

  constructor(props) {
    super(props);
    this.onChange=this.onChange.bind(this);
    this.convertData=this.convertData.bind(this);
    this.filterData=this.filterData.bind(this);
    this.state = {
      startDate:new Date('foo'),
      endDate:new Date('foo')
    };
  }

  onChange(event) {
    let value = event.target.value;
    let id = event.target.id;
    switch(id) {
    case 'startDate':
      this.setState({startDate: new Date(value)});
      break;
    case 'endDate':
      this.setState({endDate: new Date(value)});
      break;
    default:
      break;
    }
  }

  filterData(data) {    
    let filterData = [];
    filterData = data.filter((object) => {
      let objectDate = new Date(object.date);
      if (objectDate >= this.state.startDate && objectDate <= this.state.endDate) {
        return object;
      } else if ((objectDate >= this.state.startDate && this.state.endDate.toString() === 'Invalid Date')
        || (objectDate <= this.state.endDate && this.state.startDate.toString() === 'Invalid Date')) {
        return object;
      }
    });

    return filterData;
  }

  mapData(data) {
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

  convertData(data) {
    let dataToMap = [];
    let filterData = [];
    if(this.state.startDate.toString() !== 'Invalid Date' ||
      this.state.endDate.toString() !== 'Invalid Date') {
      filterData = this.filterData(data);
      dataToMap = filterData;
    } else {
      dataToMap = data;
    }
    return this.mapData(dataToMap);

  }
  
  render() {

    const data = leaderboards.leaderboards;   
    const newData = this.convertData(data);
    const columns = [
      {
        name: 'Name',
        options: {
          filter: true,
          sort: false,
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
          filter: false,
          sort: true,
        }
      }
    ];
    const options = {
      filterType: 'multiselect',
      selectableRows: false,
    };

    return (
      <div className="Leaderboards">
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
