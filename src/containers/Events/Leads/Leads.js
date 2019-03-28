import React from 'react';
import { Component } from 'react';
import MUIDataTable from 'mui-datatables';
import './Leads.css';

import {print} from '../../../utils/Debug';

class Leads extends Component {
  state = {
    data: []
  }

  componentDidMount() {
    this.setState({data: this.props.data});
  }

  mapData(data) {

    print ('Leads', 'mapData');

    let newData = [];
    newData = data.map((object) => {
      let rowData = [];
      for (let data in object) {
        if (data !== 'leadId') {
          rowData.push(object[data]);
        }
      }
      return rowData;
    });

    return newData;
  }
  
  render() {

    print ('Leads', 'render');
    
    console.log(this.state.data);

    if (this.state.loading) {
      return (
        <div className='Leads'>
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
        name: 'industry',
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
        name: 'contactRole',
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
        name: 'website',
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
      <div className='Leads'>
        <div id='table'>
          <MUIDataTable
            title={'Liidit'}
            data={newData}
            columns={columns}
            options={options}
          />
        </div>  
      </div>
     
    );

  }
}

export default Leads;
