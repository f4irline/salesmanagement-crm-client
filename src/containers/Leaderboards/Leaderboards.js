import React from 'react';
import { Component } from 'react';
import MUIDataTable from 'mui-datatables';
import TextField from '@material-ui/core/TextField';
import './Leaderboards.css';
import Loading from '../../components/Loading/Loading';

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
    let value = event.target.value;
    let id = event.target.id;

    // eslint-disable-next-line
    if (!value == '') {    
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
    } else {
      switch(id) {
      case 'startDate':
        this.setState({startDate: new Date('Undefined')}, () => {
          this.props.updateDate(this.state.startDate, this.state.endDate);
        });
        break;
      case 'endDate':
        this.setState({endDate: new Date('Undefined')}, () => {
          this.props.updateDate(this.state.startDate, this.state.endDate);
        });
        break;
      default:
        break;
      }  
    }
  }

  mapData(data) {
    if (new Date(this.state.endDate) < new Date(this.state.startDate)) {
      return [];
    }

    let newData = [];
    newData = data.map((object) => {
      let rowData = [];
      let fullName = '';
      for (let data in object) {
        switch(data) {
        case 'user_first': {
          fullName += object[data]+' ';
          break;
        }
        case 'user_last': {
          fullName += object[data];
          rowData.push(fullName);
          break;
        } case 'monthly_sales': {
          break;
        }
        default: {
          rowData.push(object[data]);
        }
        }
      }
      return rowData;
    });

    return newData;
  }
  
  render() {

    if (this.state.loading) {
      return (
        <div className='Leaderboards'>
          <Loading />
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
        name: 'Hit rate (%)',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Keskim. myynti (€)',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Kokonaismyynti (€)',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Yhteydenotot (kpl)',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Tapaamiset (kpl)',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Tarjoukset (kpl)',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Sopimukset (kpl)',
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
      responsive: 'scroll',
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
            placeholder='dd.mm.yyyy'
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
            placeholder='dd.mm.yyyy'
            defaultValue={this.state.endDate}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.onChange}
          />
        </form>
        <div id='table-leaderboards'>
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
