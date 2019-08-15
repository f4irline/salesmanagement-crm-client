import React from 'react';
import MUIDataTable from 'mui-datatables';
import './Meetings.css';
import { IconButton } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';

const Meetings = (props) => {

  const mapData = (data) => {
    let newData = [];
    newData = data.map((object) => {
      let rowData = [];
      for (let data in object) {
        if (data === 'date' || data === 'companyName' || data === 'place' || data === 'notes') {
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
      name: 'Päivämäärä',
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
      name: 'Yritys',
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
      name: 'Lisätiedot',
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: 'Muokkaa',
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
    <div className='Meetings'>
      <div id='table-drawer'>
        <MUIDataTable
          title={'Tapaamiset'}
          data={newData}
          columns={columns}
          options={options}
        />
      </div>  
    </div>
    
  );
};

export default Meetings;
