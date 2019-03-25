import React from 'react';
import { Component } from 'react';
import MUIDataTable from 'mui-datatables';
import TextField from '@material-ui/core/TextField';
import './Events.css';
import {Switch, Route, Redirect} from 'react-router-dom';

import Contacts from './Contacts/Contacts';

import {print} from '../../utils/Debug';

class Events extends Component {
  state = {
    startDate: new Date('foo'),
    endDate: new Date('foo'),
    data: []
  }

  componentDidMount() {
    print('Events', 'componentDidMount');
    this.setState({data: this.props.data});
  }

  onChange = this.onChange.bind(this);
//  convertData=this.convertData.bind(this);
//  filterData=this.filterData.bind(this);

  onChange(event) {

    print('Events', 'onChange');

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

  // filterData(data) {    

  //   print ('Events', 'filterData');
    
  //   let filterData = [];
    
  //   // eslint-disable-next-line
  //   filterData = data.filter((object) => {
  //     let objectDate = new Date(object.date);
  //     if (objectDate >= this.state.startDate && objectDate <= this.state.endDate) {
  //       return object;
  //     } else if ((objectDate >= this.state.startDate && this.state.endDate.toString() === 'Invalid Date')
  //       || (objectDate <= this.state.endDate && this.state.startDate.toString() === 'Invalid Date')) {
  //       return object;
  //     }
  //   });

  //   return filterData;
  // }

  // mapData(data) {

  //   print ('Events', 'mapData');

  //   let newData = [];
  //   newData = data.map((object) => {
  //     let rowData = [];
  //     let fullName = '';
  //     for (let data in object) {
  //       if (data === 'user_first') {
  //         fullName += object[data]+' ';
  //       } else if (data === 'user_last') {
  //         fullName += object[data];
  //         rowData.push(fullName);
  //       } else {
  //         rowData.push(object[data]);
  //       }
  //     }
  //     return rowData;
  //   });

  //   return newData;
  // }

  // convertData(data) {

  //   print ('Events', 'convertData');

  //   let dataToMap = [];
  //   let filterData = [];
  //   if(this.state.startDate.toString() !== 'Invalid Date' ||
  //     this.state.endDate.toString() !== 'Invalid Date') {
  //     filterData = this.filterData(data);
  //     dataToMap = filterData;
  //   } else {
  //     dataToMap = data;
  //   }
  //   return this.mapData(dataToMap);

  // }
  
  render() {

    print ('Events', 'render');

    if (this.state.loading) {
      return (
        <div className='Events'>
          <p>Loading...</p>
        </div>
      );
    }

    const data = this.state.data;   
    const columns = [
      {
        name: 'Nimi',
        options: {
          filter: true,
          sort: false,
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

    console.log('userEvents: ' + this.state.data[0]);
    return (
      <div className='Events'>
        <Switch>
          <Route path='/contacts' render={() => <Contacts data={this.state.data[0]} />} />
        </Switch>
      </div>
     
    );

  }
}

export default Events;
