import React from 'react';
import MUIDataTable from 'mui-datatables';
import './EventData.css';

const EventData = (props) => {

  const mapData = (data) => {
    let newData = [];
    newData = data.map((object) => {
      let rowData = [];
      for (let data in object) {
        if (data === 'eventType') {
          switch(object[data]) {
          case 0:
            rowData.push('Yhteydenotto');
            break;
          case 1:
            rowData.push('Tapaaminen');
            break;
          case 2:
            rowData.push('Tarjous');
            break;
          case 3:
            rowData.push('Myynti');
            break;
          default:
            rowData.push(undefined);
            break;
          }
        } else {
          rowData.push(object[data]);
        }
      }
      return rowData;
    });

    return newData;
  };
  
  const data = props.data;   
  const newData = mapData(data);

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
      name: 'Yhteyshenkilö',
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
    <div className='EventData'>
      <div id='table'>
        <MUIDataTable
          title={'Tapahtumat'}
          data={newData}
          columns={columns}
          options={options}
        />
      </div>  
    </div>
    
  );
};

export default EventData;