import React from 'react';
import { Component } from 'react';
import MUIDataTable from 'mui-datatables';
import leaderboards from '../../placeholders/leaderboards.json'; 
import TextField from '@material-ui/core/TextField';
import './Leaderboards.css';

import axios from '../../axios-options';

import {print} from '../../utils/Debug';

class Leaderboards extends Component {
  state = {
    startDate: new Date('foo'),
    endDate: new Date('foo')
  }

  componentDidMount() {

  }

  onChange = this.onChange.bind(this);
  convertData=this.convertData.bind(this);
  filterData=this.filterData.bind(this);

  onChange(event) {

    print('Leaderboards', 'onChange');

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

    print ('Leaderboards', 'filterData');
    
    let filterData = [];
    
    // eslint-disable-next-line
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

    print ('Leaderboards', 'mapData');

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

    print ('Leaderboards', 'convertData');

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

    print ('Leaderboards', 'render');

    const data = leaderboards.leaderboards;   
    const newData = this.convertData(data);
    const columns = [
      {
        name: 'Nimi',
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
        name: 'Keskim. myynti',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Kokonaismyynti',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Yhteydenotot',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Tapaamiset',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Tarjoukset',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Sopimukset',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Pvm',
        options: {
          filter: false,
          sort: true,
        }
      }
    ];
    const options = {
      filterType: 'multiselect',
      selectableRows: false,
      search: false,
      textLabels: {
        body: {
          noMatch: 'Ei tuloksia',
          toolTip: 'Järjestä',
        },
        pagination: {
          next: 'Seuraava sivu',
          previous: 'Edellinen sivu',
          rowsPerPage: 'Rivejä / sivu:',
          displayRows: '-',
        },
        toolbar: {
          search: 'Etsi',
          downloadCsv: 'Lataa CSV',
          print: 'Tulosta',
          viewColumns: 'Sarakkeet',
          filterTable: 'Suodata',
        },
        filter: {
          all: 'Kaikki',
          title: 'SUODATTIMET',
          reset: 'RESETOI',
        },
        viewColumns: {
          title: 'Näytetyt Sarakkeet',
          titleAria: 'Näytä/Piilota Taulukon Sarakkeet',
        },
        selectedRows: {
          text: 'rivejä valittu',
          delete: 'Poista',
          deleteAria: 'Poista Valitut Rivit',
        },
      }
    
    };

    return (
      <div className='Leaderboards'>
        <form className='datePicker'>
          <TextField className='date'
            id='startDate'
            label='Aloitus päivämäärä'
            type='date'
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.onChange}
          />
          <TextField className='date'
            id='endDate'
            label='Lopetus päivämäärä'
            type='date'
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.onChange}
          />
        </form>
        <div id='table'>
          <MUIDataTable
            title={'Sijoitukset'}
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
