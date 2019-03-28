import React from 'react';
import { Component } from 'react';
import MUIDataTable from 'mui-datatables';
import './Sales.css';

import {print} from '../../../utils/Debug';

class Sales extends Component {
  state = {
    data: []
  }

  componentDidMount() {
    this.setState({data: this.props.data});
  }

  mapData(data) {

    print ('Sales', 'mapData');

    let newData = [];
    newData = data.map((object) => {
      let rowData = [];
      for (let data in object) {
        if (data === 'date' || data === 'sum' || data === 'notes') {
          rowData.push(object[data]);
        } else if(data === 'lead') {
          rowData.push(object[data].companyName)
        }
      }
      return rowData;
    });

    return newData;
  }
  
  render() {

    print ('Sales', 'render');
    
    console.log(this.state.data);

    if (this.state.loading) {
      return (
        <div className='Sales'>
          <p>Loading...</p>
        </div>
      );
    }

    const data = this.state.data;   
    const newData = this.mapData(data);
    const columns = [
      {
        name: 'Päivämäärä',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Yritys',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Tarjouksen summa',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Lisätiedot',
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
      <div className='Offers'>
        <div id='table'>
          <MUIDataTable
            title={'Kaupat'}
            data={newData}
            columns={columns}
            options={options}
          />
        </div>  
      </div>
     
    );

  }
}

export default Sales;
