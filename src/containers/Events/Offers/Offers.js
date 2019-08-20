import React from 'react';
import { withRouter } from 'react-router-dom';
import MUIDataTable from 'mui-datatables';
import './Offers.css';
import { IconButton } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';

const Offers = (props) => {
  
  const mapData = (data) => {
    let newData = [];
    newData = data.map((object) => {
      let rowData = [];
      for (let data in object) {
        if (data === 'date' || data === 'companyName' || data === 'notes' || data === 'sum') {
          rowData.push(object[data]);
        } else if (data === 'user') {
          rowData.push(`${object[data].userFirst} ${object[data].userLast}`);
        }
      }
      object.user.userId === props.userId
        ? rowData.push(
          <IconButton onClick={() => onClickEditHandler(object)}> 
            <CreateIcon />
          </IconButton>
        ): rowData.push('');

      return rowData;
    });

    return newData;
  };

  const onClickEditHandler = (event) => {
    props.history.push('/admin/events/edit/'+event.eventId);
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
      name: 'Tarjouksen summa (€)',
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
    <div className='Offers'>
      <div id='table-drawer'>
        <MUIDataTable
          title={'Tarjoukset'}
          data={newData}
          columns={columns}
          options={options}
        />
      </div>  
    </div>
    
  );
};

export default withRouter(Offers);
