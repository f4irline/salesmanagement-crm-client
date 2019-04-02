import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ModalContent from './components/ModalContent/ModalContent';
import Modal from '@material-ui/core/Modal';

import Dashboard from './containers/Dashboard/Dashboard';
import Error from './containers/Error/Error';
import Leaderboards from './containers/Leaderboards/Leaderboards';
import Events from './containers/Events/Events';
import Navigation from './containers/Navigation/Navigation';
import Login from './containers/Login/Login';
import ControlPanel from './containers/ControlPanel/ControlPanel';

import axios from './axios-options';

import './App.css';

const {getDate} = require('./utils/Date');

class App extends Component {

  state = {
    loggedIn: true,
    modalOpen: false,
    user_id: '100001',
    loadingLeads: true,
    loadingLeaderBoards: false,
    loadingUserEvents: false,
    loadingUser: false,
    loadingUserData: false,
    loadingCompany: false,
    loadingAdminData: false,
    leads: [], 
    leaderBoards: [],
    userEvents: [],
    user: {},
    userData: {},
    companyData: [],
    companyStartDate: getDate('monthFirst'),
    companyEndDate: getDate('monthLast'),
    leaderStartDate: new Date('Undefined'),
    leaderEndDate: new Date('Undefined')
  }

  validateDate = this.validateDate.bind(this);

  componentDidMount() {
    if (this.state.loggedIn) {
      this.updateAll();
    }
  }

  updateAll() {
    this.updateCompanyData(this.state.companyStartDate, this.state.companyEndDate);
    this.updateLeads();
    this.updateLeaderBoards();
    this.updateUserEvents();
    this.updateUserData();
    this.updateUser();
    this.updateAdmin();
  }

  updateCompanyData(startDate, endDate) {
    let start = undefined;
    let end = undefined;
    
    if (startDate === undefined && endDate === undefined) {
      start = this.state.startDate;
      end = this.state.endDate;
    } else {
      start = startDate;
      end = endDate;
    }

    let url_companyChart = `/companyChart/get/${start}/${end}`;
    this.setState({loadingCompany: true, companyStartDate: start, companyEndDate: end}, () => {
      axios.get(url_companyChart)
        .then(res => this.setState({companyData: res.data}, () => {
          this.setState({loadingCompany: false});
        }));
    });
  }

  updateUserEvents() {
    let url_userEvents = `/userEvents/${this.state.user_id}`;
    this.setState({loadingUserEvents: true}, () => {
      axios.get(url_userEvents)
        .then(userEvents => this.setState({userEvents: userEvents.data, modalOpen: false}, () => {
          this.setState({loadingUserEvents: false});
        }))
        .catch(err => console.log(err));
    });
  }

  updateUserData() {
    let url_userData = `/userData/${this.state.user_id}`;
    this.setState({loadingUserData: true}, () => {
      axios.get(url_userData)
        .then(userData => this.setState({userData: userData.data, modalOpen: false}, () => {
          this.setState({loadingUserData: false});
        }))
        .catch(err => console.log(err));
    });
  }

  updateUser() {
    let url_user = `/users/${this.state.user_id}`;
    this.setState({loadingUser: true}, () => {
      axios.get(url_user)
        .then(user => this.setState({user: user.data}, () => {
          this.setState({loadingUser: false});
        }))
        .catch(err => console.log(err));
    });
  }

  updateLeaderBoards() {
    this.setState({loadingLeaderBoards: true}, () => {
      axios.get('/userData/all')
        .then(res => this.setState({leaderBoards: res.data, modalOpen: false}, () => {
          this.setState({loadingLeaderBoards: false});
        }));
    });  
  }

  updateLeaderBoardsByDate(startDate, endDate) {
    this.setState({leaderStartDate: startDate, leaderEndDate: endDate}, () => {
      this.validateDate(startDate, endDate);
    });
  }

  validateDate(startDate, endDate) {
    this.setState({loadingLeaderBoards: true}, () => {
      if (startDate.toString() !== 'Invalid Date' && endDate.toString() !== 'Invalid Date') {
        axios.get(`/userData/all/${startDate}/${endDate}`)
          .then(res => this.setState({leaderBoards: res.data, modalOpen: false}, () => {
            this.setState({loadingLeaderBoards: false});
          }));
      } else if (startDate.toString() !== 'Invalid Date') {
        axios.get(`/userData/all/${startDate}/2100-01-01`)
          .then(res => this.setState({leaderBoards: res.data, modalOpen: false}, () => {
            this.setState({loadingLeaderBoards: false});
          }));
      } else if (endDate.toString() !== 'Invalid Date') {
        axios.get(`/userData/all/1970-01-01/${endDate}`)
          .then(res => this.setState({leaderBoards: res.data, modalOpen: false}, () => {
            this.setState({loadingLeaderBoards: false});
          }));
      }  
    });
  }

  updateLeads() {
    this.setState({loadingLeads: true}, () => {
      axios.get('/leads')
        .then(res => this.setState({leads: res.data, modalOpen: false}, () => {
          this.setState({loadingLeads: false});
        }));
    });
  }

  updateAdmin() {
    this.setState({loadingAdminData: true}, () => {
      axios.get('/admin')
        .then(res => this.setState({adminData: res.data, modalOpen: false}, () => {
          console.log(this.state.adminData);
          this.setState({loadingAdminData: false});
        }));
    });
  }

  /**
   * Handles logging the user in
   * 
   * @param {String} name 
   */
  handleLogin(userId) {
    this.setState({loggedIn: true, user_id: userId}, () => {
      this.updateAll();
    });
  }

  handleLogout() {
    this.setState({loggedIn: false});
  }

  modalClose() {
    this.setState({modalOpen: false});
  }

  modalOpen() {
    this.setState({modalOpen: true});
  }

  redirect() {
    this.context.router.push('/');
  }

  render() {
    if (!this.state.loggedIn) {
      return (
        <div>
          <Redirect to='/' />
          <Login onLogin={this.handleLogin.bind(this)} />
        </div>
      );
    }

    if (this.state.loadingLeads || this.state.loadingLeaderBoards || this.state.loadingUser 
      || this.state.loadingUserData || this.state.loadingUserEvents || this.state.loadingAdminData) {
      return (
        <div className='App'>
          <Navigation handleLogout = {this.handleLogout.bind(this)} />
        </div>
      );
    }
    
    return (
      <div className='App'>
        <Navigation handleLogout = {this.handleLogout.bind(this)} />
        <Switch>
          <Route path='/' render={() => <Dashboard 
            user={this.state.user} 
            userData={this.state.userData} 
            companyData={this.state.companyData}
            companyDates={[this.state.companyStartDate, this.state.companyEndDate]}
            updateCompany={this.updateCompanyData.bind(this)} 
            user_id={this.state.user_id}/>} 
          exact />
          <Route path='/leaderboards' render={() => <Leaderboards leaderDates={[this.state.leaderStartDate, this.state.leaderEndDate]} updateDate={this.updateLeaderBoardsByDate.bind(this)} data={this.state.leaderBoards} />} />
          <Route path='/events' render={() => <Events data={this.state.userEvents} />} />
          <Route path='/admin' render={() => <ControlPanel update={this.updateAll.bind(this)} data={this.state.adminData} />} />
          <Route component={Error} />
        </Switch>
        <div className='add-wrapper'>
          <Fab className='add-icon' onClick={this.modalOpen.bind(this)} size='large' color='primary'>
            <AddIcon />
          </Fab>
        </div>
        <Modal 
          open={this.state.modalOpen} 
          onClose={this.modalClose.bind(this)}
          className='modal-wrapper'
          onEscapeKeyDown={this.modalClose.bind(this)}>
          <ModalContent
            updateUserData={this.updateUserData.bind(this)}
            updateLeaderBoards={this.updateLeaderBoards.bind(this)} 
            updateUserEvents={this.updateUserEvents.bind(this)}
            updateLeads={this.updateLeads.bind(this)} 
            updateCompanyGraph={this.updateCompanyData.bind(this)}
            userId={this.state.user_id} 
            closeModal={this.modalClose.bind(this)} 
            leads={this.state.leads}/>
        </Modal>
      </div>
    );
  }
}

export default App;
