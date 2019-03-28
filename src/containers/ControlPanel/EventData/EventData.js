import React from 'react';
import { Component } from 'react';
import MUIDataTable from 'mui-datatables';
import './EventData.css';

import {print} from '../../../utils/Debug';

class EventData extends Component {
  state = {
    data: []
  }

  componentDidMount() {
    //this.setState({data: this.props.data});
  }

  /*
  mapData(data) {

    print ('EventData', 'mapData');

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
  */
  
  render() {

    print ('EventData', 'render');
    console.log(this.state.data);

    if (this.state.loading) {
      return (
        <div className='EventData'>
          <p>Loading...</p>
        </div>
      );
    }

    //const data = this.state.data;   
    //const newData = this.mapData(data);
    const columns = [
      {
        name: 'ID',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Nimi',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Kirjautunut',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Rooli',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Tavoite',
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
      <div className='EventData'>
        <div id='table'>
          <MUIDataTable
            title={'Käyttäjät'}
            //data={newData}
            columns={columns}
            options={options}
          />
        </div>  
      </div>
     
    );

  }
}

export default EventData;