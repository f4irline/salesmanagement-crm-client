import React from 'react';
import { Component } from 'react';
import MUIDataTable from 'mui-datatables';
import TextField from '@material-ui/core/TextField';
import './Events.css';

import {print} from '../../utils/Debug';

class Contacts extends Component {
  state = {
    data: []
  }

  componentDidMount() {
    this.setState({data: this.props.data});
  }

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
    const newData = this.data;
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

    return (
      <div className='Events'>
        <form className='datePicker'>


        </form>
        { <div id='table'>
          <MUIDataTable
            title={'Tapahtumat'}
            data={newData}
            columns={columns}
            options={options}
          />
        </div>   }
      </div>
     
    );

  }
}

export default Contacts;