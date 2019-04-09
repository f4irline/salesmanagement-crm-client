import { Route, withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import MUIDataTable from 'mui-datatables';
import './UserData.css';
import AlertDialog from '../../../components/AlertDialog/AlertDialog';

import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import axios from '../../../axios-options';

import EditUser from './EditUser';

class UserData extends Component {

  state = {
    showDialog: false,
    dataToEdit: {}
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

      // eslint-disable-next-line
      if(object.userId != this.props.user_id) {
        rowData.push(
          <IconButton aria-label='Delete' onClick={()=>{
            this.onClickDeleteHandler(object.userId);
          }}>
            <DeleteIcon />
          </IconButton>
        );
      } else {
        rowData.push('');
      }

      rowData.push(
        <IconButton aria-label='Create' onClick={() => this.onClickEditHandler(object)}> 
          <CreateIcon />
        </IconButton>
      );
      return rowData;
    });
    return newData;
  }

  onClickDeleteHandler(userId) {
    this.setState({showDialog: true, userId: userId});
  }
  
  onClickEditHandler = (user) => {
    this.setState({dataToEdit: user}, () => {
      this.props.history.push('/admin/users/edit/'+user.userId);
    });
  }

  onClickCloseHandler(name) {
    const jwt = localStorage.getItem('accessToken');
    const options = {
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    };

    if(name === 'delete') {
      axios.delete('/users/'+this.state.userId, options)
        .then((res) => {
          this.props.update();
        })
        .catch(err => console.log(err));
    }
    this.setState({showDialog: false});
  }

  render() {

    const data = this.props.data;
    const newData = this.mapData(data);

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
        {this.state.showDialog ? <AlertDialog title='Poista käyttäjä' description = 'Haluatko varmasti poistaa käyttäjän?' handleClose={this.onClickCloseHandler.bind(this)} /> : null}
        <div id='table' style={{position: 'relative', top: '3vh'}}>
          <Route path='/admin/users' exact render={() => 
            <MUIDataTable
              title={'Käyttäjät'}
              data={newData}
              columns={columns}
              options={options}
            />
          } />
          <Route path='/admin/users/edit/:id' render={() => 
            <EditUser roleNames={this.props.roleNames} update={this.props.update} />
          } />
        </div>  
      </div>
      
    );
  }
}

export default withRouter(UserData);
