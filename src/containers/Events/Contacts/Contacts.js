import React, {Component} from 'react';
import MUIDataTable from 'mui-datatables';
import './Contacts.css';
import AlertDialog from '../../../components/AlertDialog/AlertDialog'

import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';

class Contacts extends Component {

  state = {
    showDialog: false,
    newData: []
  }

  mapData(data) {
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
      rowData.push(
        <IconButton aria-label='Delete' onClick={this.onClickDeleteHandler.bind(this)}>
          <DeleteIcon />
        </IconButton>
      )
      rowData.push(
        <IconButton aria-label='Create' onClick={this.onClickEditHandler.bind(this)}>
          <CreateIcon />
        </IconButton>
      )
      return rowData;
    });
    return newData;
  };

  componentDidMount() {
    const data = this.props.data;   
    this.setState({newData: this.mapData(data)})
  }

  onClickDeleteHandler() {
    this.setState({showDialog: true});
  }

  onClickCloseHandler(name) {
    if(name === 'delete') {

    }
    this.setState({showDialog: false});
  }

  onClickEditHandler() {
    
  }

  render() {
    const columns = [
      {
        name: 'päivämäärä',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'yritys',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'yhteyshenkilö',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'puhelinnumero',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'sähköposti',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'lisätiedot',
        options: {
          filter: false,
          sort: true,
        }
      }, {
        name: 'Poista'
      }, {
        name: 'Muokkaa'
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
        {this.state.showDialog ? <AlertDialog title='Poista tapahtuma' description = 'Haluatko varmasti poistaa tapahtuman?' handleClose={this.onClickCloseHandler.bind(this)} /> : null}
        <div id='table'>
          <MUIDataTable
            title={'Yhteydenotot'}
            data={this.state.newData}
            columns={columns}
            options={options}
          />
        </div>  
      </div>
      
    );
  }
};

export default Contacts;
