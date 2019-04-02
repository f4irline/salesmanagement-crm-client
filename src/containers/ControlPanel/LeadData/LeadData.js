import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MUIDataTable from 'mui-datatables';
import './LeadData.css';
import EditLead from './EditLead.js';

class LeadData extends Component {
  
  state = {
    showDialog: false,
    newData: [],
    dataToEdit : {}
  }

  mapData(data) {
    let newData = [];
    newData = data.map((object) => {
      let rowData = [];
      for (let data in object) {
        rowData.push(object[data]);
      }
      return rowData;
    });

    return newData;
  }
  
  componentDidMount() {
    const data = this.props.data;   
    this.setState({newData: this.mapData(data)});
  }

  onClickOpenHandler() {
    this.setState({showDialog: true});
  }

  onClickEditHandler = event => {
    this.setState({dataToEdit : event});
  }

  render() {
    const columns = [
      {
        name: 'ID',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Luotu',
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
        name: 'Ala',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Yhteyshenkilö',
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
        name: 'Puhelin',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Email',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'WWW',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Huom',
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
      <div className='LeadData'>
        <div id='table'>
          <Route path='/admin/leads' exact render={
            <MUIDataTable
              title={'Käyttäjät'}
              data={this.state.newData}
              columns={columns}
              options={options}
            />
          } />
          <Route path='/admin/leads/edit' render={() =>
            <EditLead data={this.state.dataToEdit}/>
          } />
        </div>  
      </div>
    );
  }
}

export default LeadData;