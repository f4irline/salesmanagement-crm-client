import React from 'react';
import MUIDataTable from 'mui-datatables';
import './Contacts.css';

const Contacts = (props) => {

  const mapData = (data) => {
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
      <div id='table'>
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
