import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import './ModalContent.css';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import LeadContent from './Content/LeadContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ContactContent from './Content/ContactContent';
import MeetingContent from './Content/MeetingContent';
import SalesContent from './Content/SalesContent';
import OfferContent from './Content/OfferContent';
import MenuItem from '@material-ui/core/MenuItem';
import axios from '../../axios-options';
import CloseLead from './Content/CloseLead';
import Close from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';

class ModalContent extends Component {

  state = {
    selectedValue: '',
    leads: [],
    leadNames: [],
    labelWidth: 0
  };

  componentDidMount() {
    this.setState({leads: this.props.leads}, () => {
      const leadNames = this.state.leads.map(lead => {
        return <MenuItem key={lead.companyName} value={lead.companyName}>{lead.companyName}</MenuItem>;
      });
      this.setState({leadNames: leadNames});
    });
  }

  updateData = () => {
    this.props.updateUserData();
    this.props.updateLeaderBoards();
    this.props.updateCompanyGraph();
    this.props.updateAllEvents();
    this.props.updateAdminData();
  }

  handleSend = data => event => {
    const jwt = sessionStorage.getItem('accessToken');
    const options = {
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    };

    if (data.eventType === 4) {
      let dataToSend = {};
      for (const key in data) {
        if (key === 'typedContactRole') {
          continue;
        }

        if (key !== 'contactRole') {
          if (key !== 'labelWidth') {
            dataToSend[key] = data[key];
          }  
        } else {
          if (data[key] === 'Muu') {
            dataToSend[key] = data['typedContactRole'];
          } else {
            dataToSend[key] = data[key];
          }
        }
      }

      axios.post(`/leads/add/${this.props.userId}`, data, options)
        .then(() => {})
        .then(() => {
          this.props.updateLeads();
          this.props.updateAllEvents();
          this.props.updateAdminData();
        });
    } else {
      const leadId = this.findLeadId(data);

      let sentData = {};

      for (const key in data) {
        if (key !== 'labelWidth') {
          sentData[key] = data[key];
        }
      }

      console.log(sentData);

      axios.post(`events/add/${this.props.userId}/${leadId}`, sentData, options)
        .then(() => {})
        .then(this.updateData.bind(this));
    }
  }

  findLeadId(data) {
    for (let lead of this.state.leads) {
      if (lead.companyName === data.companyName) {
        return lead.leadId;
      }
    }
  }

  handleChange = event => {
    this.setState({ selectedValue: event.target.value });
  };

  render() {

    let content = null;

    if (this.state.selectedValue === 'lead')
      content = <LeadContent handleSend={this.handleSend.bind(this)} />;
    else if (this.state.selectedValue === 'contact')
      content = <ContactContent handleSend={this.handleSend.bind(this)} leadNames={this.state.leadNames}/>;
    else if (this.state.selectedValue === 'meeting')
      content = <MeetingContent handleSend={this.handleSend.bind(this)} leadNames={this.state.leadNames}/>;
    else if (this.state.selectedValue === 'sales')
      content = <SalesContent handleSend={this.handleSend.bind(this)} leadNames={this.state.leadNames}/>;
    else if (this.state.selectedValue === 'offer')
      content = <OfferContent handleSend={this.handleSend.bind(this)} leadNames={this.state.leadNames}/>;
    else if (this.state.selectedValue === 'close') 
      content = <CloseLead handleSend={this.handleSend.bind(this)} leadNames={this.state.leadNames}/>;

    return (
      <div className='ModalContent' tabIndex={-1}>
        <Typography variant='h4' gutterBottom className='controls-header'>
          Lisää:
        </Typography>
        <div className='close-wrapper'>
          <IconButton onClick={this.props.closeModal} color='secondary'> 
            <Close />
          </IconButton>
        </div>
        <div>
          <RadioGroup 
            row
            name='radioGroup'
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
            className='controls-wrapper'
          >
            <FormControlLabel value='lead' control={<Radio />} label='Liidi' />
            <FormControlLabel value='contact' control={<Radio />} label='Yhteydenotto' />
            <FormControlLabel value='meeting' control={<Radio />} label='Tapaaminen' />
            <FormControlLabel value='offer' control={<Radio />} label='Tarjous' />
            <FormControlLabel value='sales' control={<Radio />} label='Myynti' />
            <FormControlLabel value='close' control={<Radio />} label='Sulje' />
          </RadioGroup>
        </div>
        <div className='content-wrapper'>
          {content}
        </div>
      </div>
    );
  }
}

export default ModalContent;