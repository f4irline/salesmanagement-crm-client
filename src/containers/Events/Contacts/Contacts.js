import React from 'react';
import { Component } from 'react';
import MUIDataTable from 'mui-datatables';
import './Contacts.css';

import {print} from '../../../utils/Debug';

class Contacts extends Component {
  state = {
    data: []
  }

  componentDidMount() {
    this.setState({data: this.props.data});
  }

  mapData(data) {

    print ('Contacts', 'mapData');

    let newData = [];
    newData = data.map((object) => {
      let rowData = [];
      for (let data in object) {
        if (data !== 'eventId' && data !== 'eventType' && data !== 'user' && data !== 'sum' && data !== 'place') {
          if (data === 'lead') {
            rowData.push(object[data].companyName);
          } else {
            rowData.push(object[data]);
          }
          
        }
      }
      return rowData;
    });

    return newData;
  }
  
  render() {

    print ('Contacts', 'render');
    console.log(this.state.data);

    if (this.state.loading) {
      return (
        <div className='Contacts'>
          <p>Loading...</p>
        </div>
      );
    }

    const data = this.state.data;   
    const newData = this.mapData(data);
    const columns = [
      {
        name: 'date',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'companyName',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'contactPerson',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'phoneNumber',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'email',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'notes',
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
      filter: false,
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
      <div className='Contacts'>
        <div id='table'>
          <MUIDataTable
            title={'Yhteydenotot'}
            data={newData}
            columns={columns}
            options={options}
          />
        </div>  
      </div>
     
    );

  }
}

export default Contacts;
