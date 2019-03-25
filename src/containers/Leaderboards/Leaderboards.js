import React from 'react';
import { Component } from 'react';
import MUIDataTable from 'mui-datatables';
import TextField from '@material-ui/core/TextField';
import './Leaderboards.css';

import {print} from '../../utils/Debug';

class Leaderboards extends Component {
  state = {
    startDate: this.props.leaderDates[0],
    endDate: this.props.leaderDates[1],
    data: []
  }

  componentDidMount() {
    this.setState({data: this.props.data});
  }

  onChange = this.onChange.bind(this);

  onChange(event) {

    print('Leaderboards', 'onChange');

    let value = event.target.value;
    let id = event.target.id;
    switch(id) {
    case 'startDate':
      this.setState({startDate: new Date(value).toISOString().slice(0, 10)}, () => {
        this.props.updateDate(this.state.startDate, this.state.endDate);
      });
      break;
    case 'endDate':
      this.setState({endDate: new Date(value).toISOString().slice(0, 10)}, () => {
        this.props.updateDate(this.state.startDate, this.state.endDate);
      });
      break;
    default:
      break;
    }
  }

  mapData(data) {

    print ('Leaderboards', 'mapData');

    if (new Date(this.state.endDate) < new Date(this.state.startDate)) {
      return [];
    }

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

    print ('Leaderboards', 'render');

    if (this.state.loading) {
      return (
        <div className='Leaderboards'>
          <p>Loading...</p>
        </div>
      );
    }

    const newData = this.mapData(this.state.data);
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
            defaultValue={this.state.startDate}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.onChange}
          />
          <TextField className='date'
            id='endDate'
            label='Lopetus päivämäärä'
            type='date'
            defaultValue={this.state.endDate}
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
