import React, { Component } from 'react';
import MUIDataTable from 'mui-datatables';
import './UserData.css';
import AlertDialog from '../../../components/AlertDialog/AlertDialog'

import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import axios from '../../../axios-options';

class UserData extends Component {

  state = {
    showDialog: false,
    newData: [],
    userId: undefined
  }

  mapData(data) {
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
      rowData.push(
        <IconButton aria-label='Delete' onClick={()=>{
          this.onClickDeleteHandler(object.userId)
        }}>
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
  }

  componentDidMount() {
    const data = this.props.data;   
    this.setState({newData: this.mapData(data)});
  }

  onClickDeleteHandler(userId) {
    this.setState({showDialog: true, userId: userId});
  }
  
  onClickEditHandler(userId) {
  }

  onClickCloseHandler(name) {
    if(name === 'delete') {
      axios.delete('/users/'+this.state.userId)
        .then((res) => {
          this.props.update();
        })
        .catch(err => console.log(err));
    }
    this.setState({showDialog: false});
  }

  render() {
    console.log(this.state.newData);

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
      },{
        name: 'Poista'
      },{
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
      <div className='UserData'>
        {this.state.showDialog ? <AlertDialog title='Poista tapahtuma' description = 'Haluatko varmasti poistaa tapahtuman?' handleClose={this.onClickCloseHandler.bind(this)} /> : null}
        <div id='table'>
          <MUIDataTable
            title={'Käyttäjät'}
            data={this.state.newData}
            columns={columns}
            options={options}
          />
        </div>  
      </div>
      
    );
  }
}

export default UserData;
