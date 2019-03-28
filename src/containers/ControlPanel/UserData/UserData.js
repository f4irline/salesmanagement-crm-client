import React from 'react';
import MUIDataTable from 'mui-datatables';
import './UserData.css';

const UserData = (props) => {

  const mapData = (data) => {
    let newData = [];
    newData = data.map((object) => {
      let rowData = [];
      let fullName = '';
      for (let data in object) {
        if (data === 'userFirst') {
          fullName += object[data]+' ';
        } else if (data === 'userLast') {
          fullName += object[data];
          rowData.push(fullName);
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
      name: 'Kirjautunut',
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
      name: 'Rooli',
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: 'Tavoite',
      options: {
        filter: false,
        sort: true
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
    <div className='UserData'>
      <div id='table'>
        <MUIDataTable
          title={'Käyttäjät'}
          data={newData}
          columns={columns}
          options={options}
        />
      </div>  
    </div>
    
  );
};

export default UserData;