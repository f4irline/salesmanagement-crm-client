import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import MUIDataTable from 'mui-datatables';
import './LeadData.css';
import EditLead from './EditLead.js';
import AlertDialog from '../../../components/AlertDialog/AlertDialog';

import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import axios from '../../../axios-options';

class LeadData extends Component {
  
  state = {
    showDialog: false,
    dataToEdit : {},
    leadId: undefined
  }

  mapData(data) {
    let newData = [];
    newData = data.map((object) => {
      let rowData = [];
      for (let data in object) {
        rowData.push(object[data]);
      }
      rowData.push(
        <IconButton aria-label='Delete' onClick={()=>{
          this.onClickDeleteHandler(object.leadId);
        }}>
          <DeleteIcon />
        </IconButton>
      );
      rowData.push(
        <IconButton aria-label='Create' onClick={() => this.onClickEditHandler(object)}>
          <CreateIcon />
        </IconButton>
      );
      return rowData;
    });

    return newData;
  }
  
  onClickDeleteHandler(leadId) {
    this.setState({showDialog: true, leadId: leadId});
  }
  
  onClickEditHandler = event => {
    this.setState({dataToEdit: event}, () => {
      console.log(event);
      this.props.history.push('/admin/leads/edit/' + event.leadId);
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
      axios.delete('/leads/'+this.state.leadId, options)
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
      <div className='LeadData'>
        {this.state.showDialog ? <AlertDialog title='Poista tapahtuma' description = 'Haluatko varmasti poistaa tapahtuman?' handleClose={this.onClickCloseHandler.bind(this)} /> : null}
        <div id='table' style={{position: 'relative', top: '3vh'}}>
          <Route path='/admin/leads' exact render={() =>
            <MUIDataTable
              title={'Liidit'}
              data={newData}
              columns={columns}
              options={options}
            />
          } />
          <Route path='/admin/leads/edit/:id' render={() =>
            <EditLead update={this.props.update} data={this.state.dataToEdit}/>
          } />
        </div>  
      </div>
    );
  }
}

export default withRouter(LeadData);