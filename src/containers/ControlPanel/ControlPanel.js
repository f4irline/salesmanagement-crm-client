import React from 'react';
import { Component } from 'react';
import MUIDataTable from 'mui-datatables';
import './ControlPanel.css';

import {print} from '../../utils/Debug';
import { Button } from '@material-ui/core';

class ControlPanel extends Component {
  state = {
    data: []
  }

  componentDidMount() {
    this.setState({data: this.props.data});
  }

  onChange = this.onChange.bind(this);

  onChange(event) {

    print('ControlPanel', 'onChange');

  }

  mapData(data) {

    print ('ControlPanel', 'mapData');

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

    print ('ControlPanel', 'render');

    if (this.state.loading) {
      return (
        <div className='ControlPanel'>
          <p>Loading...</p>
        </div>
      );
    }
 
    // eslint-disable-next-line
    const newData = this.mapData(this.state.data);

    const columnsUser = [
      {
        name: 'ID',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Etunimi',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Sukunimi',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Kirjautunut viimeksi',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Role',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Kuukausitavoite',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Salasana?',
        options: {
          filter: false,
          sort: true,
        }
      }
    ];

    const columnsEvent = [
      {
        name: 'ID',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Tyyppi',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Summa',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Paikka',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Kontakti',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Puh nro',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Sähköposti',
        options: {
          filter: false,
          sort: true,
        }
      }
    ];

    const columnsLead = [
      {
        name: 'ID',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Pvm',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Yrityksen nimi',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Toimiala',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Kontakti',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Kontaktin rooli',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Puh nro',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Sähköposti',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'www-sivu',
        options: {
          filter: false,
          sort: true,
        }
      }
    ];

    const options = {
      filterType: 'multiselect',
      selectableRows: true,
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

    console.log('HALO?'+this.props.data);
    return (
      <div className='ControlPanel'>
        <div id='table'>
          <MUIDataTable
            title={'Käyttäjät'}
            //data={newData}
            columns={columnsUser}
            options={options}
          />
        </div>
        <Button variant="contained" size="small" color="primary">
          Lisää
        </Button>
        <Button variant="contained" size="small" color="primary">
          Muokkaa
        </Button>
        <Button variant="contained" size="small" color="primary">
          Poista
        </Button>
        <div id='table'>
          <MUIDataTable
            title={'Tapahtumat'}
            //data={newData}
            columns={columnsEvent}
            options={options}
          />
        </div>
        <div id='table'>
          <MUIDataTable
            title={'Liidit'}
            //data={newData}
            columns={columnsLead}
            options={options}
          />
        </div>
      </div>
     
    );

  }
}

export default ControlPanel;