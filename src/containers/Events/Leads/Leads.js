import React from 'react';
import MUIDataTable from 'mui-datatables';
import {withStyles} from '@material-ui/core/styles';
import './Leads.css';

import classNames from 'classnames';

const customStyles = {
  NewLead: {
    '& td': {backgroundColor: '#FFF'}
  },
  ContactedLead: {
    '& td': {
      backgroundColor: 'rgba(247, 130, 15, 0.8)',
      color: '#FFF'
    }
  },
  SoldLead: {
    '& td': {
      backgroundColor: 'rgba(41, 150, 0, 0.8)',
      color: '#FFF'
    }
  },
  ClosedLead: {
    '& td': {
      backgroundColor: 'rgba(240, 13, 13, 0.8)',
      color: '#FFF'
    }
  }
};

const Leads = (props) => {

  const mapData = (data) => {
    let newData = [];
    newData = data.map((object) => {
      let rowData = [];
      for (let data in object) {
        if (data !== 'leadId' && data !== 'stage') {
          if(data === 'user') {
            rowData.push(object[data].userName);
          } else if (data === 'discussion') {
            rowData.push(object[data].join(', '));
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
      name: 'tehnyt',
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
      name: 'toimiala',
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
      name: 'toimenkuva',
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
      name: 'tavattu',
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: 'keskustelun aihe',
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: 'potentiaali',
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
    }
  ];

  const options = {
    filterType: 'multiselect',
    selectableRows: false,
    search: false,
    filter: false,
    responsive: 'scroll',
    setRowProps: (row, rowIndex = 1) => {
      rowIndex = rowIndex - 1 + 1;
      return {
        className: classNames(
          {
            [props.classes.NewLead]: data[rowIndex] && data[rowIndex].stage === 'NEW'
          },
          {
            [props.classes.ContactedLead]: data[rowIndex] && data[rowIndex].stage === 'CONTACTED'
          },
          {
            [props.classes.SoldLead]: data[rowIndex] && data[rowIndex].stage === 'SOLD'
          },
          {
            [props.classes.ClosedLead]: data[rowIndex] && data[rowIndex].stage === 'CLOSED'
          }
        ),
      };  
    },
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
    <div className='Leads'>
      <div id='table-drawer'>
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

export default withStyles(customStyles)(Leads);
