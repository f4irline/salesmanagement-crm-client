import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import MUIDataTable from 'mui-datatables';
import './LeadData.css';
import EditLead from './EditLead.js';
import AlertDialog from '../../../components/AlertDialog/AlertDialog';

import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import axios from '../../../axios-options';

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
        if (data !== 'stage' && data !== 'discussion' && data !== 'meeted') {
          rowData.push(object[data]);
        }
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
      this.props.history.push('/admin/leads/edit/' + event.leadId);
    });
  }

  onClickCloseHandler(name) {
    const jwt = sessionStorage.getItem('accessToken');
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
        .catch(err => console.error(err));
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
        name: 'Luonut',
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
        name: 'Toimenkuva',
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
        name: 'Potentiaali',
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
      responsive: 'scroll',
      setRowProps: (row, rowIndex) => {
        rowIndex = rowIndex - 1 + 1;
        return {
          className: classNames(
            {
              [this.props.classes.NewLead]: data[rowIndex] && data[rowIndex].stage === 'NEW'
            },
            {
              [this.props.classes.ContactedLead]: data[rowIndex] && data[rowIndex].stage === 'CONTACTED'
            },
            {
              [this.props.classes.SoldLead]: data[rowIndex] && data[rowIndex].stage === 'SOLD'
            },
            {
              [this.props.classes.ClosedLead]: data[rowIndex] && data[rowIndex].stage === 'CLOSED'
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
      <div className='LeadData'>
        {this.state.showDialog ? <AlertDialog title='Poista liidi' description = 'Haluatko varmasti poistaa liidin?' handleClose={this.onClickCloseHandler.bind(this)} /> : null}
        <div id='table-control-panel'>
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

export default withRouter(withStyles(customStyles)(LeadData));