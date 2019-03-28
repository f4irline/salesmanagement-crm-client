import React from 'react';
import MUIDataTable from 'mui-datatables';
import './LeadData.css';

const LeadData = (props) => {
  
  const mapData = (data) => {
    let newData = [];
    newData = data.map((object) => {
      let rowData = [];
      for (let data in object) {
        rowData.push(object[data]);
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
        <MUIDataTable
          title={'Liidit'}
          data={newData}
          columns={columns}
          options={options}
        />
      </div>  
    </div>
  );
};

export default LeadData;