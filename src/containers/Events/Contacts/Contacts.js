import React from 'react';
import MUIDataTable from 'mui-datatables';
import './Contacts.css';

import { IconButton } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';

const Contacts = (props) => {

  const mapData = (data) => {
    let newData = [];
    newData = data.map((object) => {
      let rowData = [];
      for (let data in object) {
        if (data !== 'eventId' && data !== 'eventType' && data !== 'user' && data !== 'sum' && data !== 'place' && data !== 'lead') {
          rowData.push(object[data]);          
        } else if (data === 'user') {
          rowData.push(`${object[data].userFirst} ${object[data].userLast}`);
        }
      }
      object.user.userId === props.userId
        ? rowData.push(
          <IconButton onClick={() => this.onClickEditHandler(object)}> 
            <CreateIcon />
          </IconButton>
        ): rowData.push('');

      return rowData;
    });
    return newData;
  };

  const data = props.data;   
  const newData = mapData(data);

  const columns = [
    {
      name: 'päivämäärä',
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: 'Tehnyt',
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
    },
    {
      name: 'muokkaa',
      options: {
        filter: false,
        sort: false,
      }
    }
  ];

  const options = {
    filterType: 'multiselect',
    selectableRows: false,
    search: false,
    filter: false,
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
      <div id='table-drawer'>
        <MUIDataTable
          title={'Yhteydenotot'}
          data={newData}
          columns={columns}
          options={options}
        />
      </div>  
    </div>
    
  );
};

export default Contacts;
