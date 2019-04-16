import { Route, withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import MUIDataTable from 'mui-datatables';
import AlertDialog from '../../../components/AlertDialog/AlertDialog';

import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import axios from '../../../axios-options';

import { Button } from '@material-ui/core';
import EditGoal from './EditGoal';
import CreateGoal from './CreateGoal/CreateGoal';

class GoalsData extends Component {

  state = {
    showDialog: false,
    dataToEdit: {}
  }

  mapData(data) {
    let newData = [];
    newData = data.map((object) => {
      let rowData = [];
      for (let data in object) {
        if (data !== 'month') {
          rowData.push(object[data]);
        } else {
          rowData.push(this.findMonth(object[data]));
        }
      }

      rowData.push(
        <IconButton aria-label='Delete' onClick={()=>{
          this.onClickDeleteHandler(object.goalId);
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

  onClickDeleteHandler(goalId) {
    this.setState({showDialog: true, goalId: goalId});
  }
  
  onClickEditHandler = (goal) => {
    this.setState({dataToEdit: goal}, () => {
      this.props.history.push('/admin/goals/edit/'+goal.goalId);
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
      axios.delete('/companyGoals/'+this.state.goalId, options)
        .then((res) => {
          this.props.update();
        })
        .catch(err => console.error(err));
    }
    this.setState({showDialog: false});
  }

  handleButtonClick = () => {
    this.props.history.push('/admin/goals/new');
  }

  findMonth = (month) => {

    let col = '';
    for (const value in this.props.months) {
      if (month === this.props.months[value]) {
        col = value;
      }
    }

    return col;
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
        name: 'Kuukausi',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Vuosi',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Tavoite',
        options: {
          filter: false,
          sort: true,
        }
      },
      {
        name: 'Poista'
      },
      {
        name: 'Muokkaa'
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
      <div className='GoalsData'>
        {this.state.showDialog ? <AlertDialog title='Poista käyttäjä' description = 'Haluatko varmasti poistaa tavoitteen?' handleClose={this.onClickCloseHandler.bind(this)} /> : null}
        <div id='table-control-panel'>
          <Route path='/admin/goals' exact render={() => 
            <React.Fragment>
              <MUIDataTable
                title={'Tavoitteet'}
                data={newData}
                columns={columns}
                options={options}
              />
              <Button style={{marginTop: '1vh', color: '#fff'}} variant='contained' color='primary' onClick={this.handleButtonClick}>
                Lisää uusi tavoite!
              </Button>
            </React.Fragment>
          } />
          <Route path='/admin/goals/new' render={() => 
            <CreateGoal months={this.props.months} monthItems={this.props.monthItems} update={this.props.update} />
          } />
          <Route path='/admin/goals/edit/:id' render={() => 
            <EditGoal months={this.props.months} monthItems={this.props.monthItems} update={this.props.update} />
          } />
        </div>  
      </div>
      
    );
  }
}

export default withRouter(GoalsData);
