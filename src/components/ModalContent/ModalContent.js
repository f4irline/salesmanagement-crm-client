import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import './ModalContent.css';
import Paper from '@material-ui/core/Paper';
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

class ModalContent extends Component {

  state = {
    selectedValue: '',
    leads: [],
    leadNames: [],
    labelWidth: 0
  };

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setState({leads: this.props.leads}, () => {
      const leadNames = this.state.leads.map(lead => {
        return <MenuItem key={lead.companyname} value={lead.companyname}>{lead.companyname}</MenuItem>;
      });
      this.setState({leadNames: leadNames});
    });
  }

  handleClick = data => event => {
    if (data.type === 4) {
      axios.post('/leads/add', data)
        .then((res) => console.log(res));
    }

    this.props.closeModal();
  }

  handleChange = event => {
    this.setState({ selectedValue: event.target.value });
  };

  render() {

    let content = null;

    if (this.state.selectedValue === 'lead')
      content = <LeadContent handleClick={this.handleClick} />;
    else if (this.state.selectedValue === 'contact')
      content = <ContactContent handleClick={this.handleClick} leadNames={this.state.leadNames}/>;
    else if (this.state.selectedValue === 'meeting')
      content = <MeetingContent handleClick={this.handleClick} leadNames={this.state.leadNames}/>;
    else if (this.state.selectedValue === 'sales')
      content = <SalesContent handleClick={this.handleClick} leadNames={this.state.leadNames}/>;
    else if (this.state.selectedValue === 'offer')
      content = <OfferContent handleClick={this.handleClick} leadNames={this.state.leadNames}/>;

    return (
      <div className='ModalContent' tabIndex={-1}>
        <Paper>
          <Typography variant='h4' gutterBottom className='controls-header'>
            Lisää:
          </Typography>
          <div>
            <RadioGroup row
              name='radioGroup'
              value={this.state.value}
              onChange={this.handleChange}
              className='controls-wrapper'
            >
              <FormControlLabel value='lead' control={<Radio />} label='Liidi' />
              <FormControlLabel value='contact' control={<Radio />} label='Yhteydenotto' />
              <FormControlLabel value='meeting' control={<Radio />} label='Tapaaminen' />
              <FormControlLabel value='offer' control={<Radio />} label='Tarjous' />
              <FormControlLabel value='sales' control={<Radio />} label='Myynti' />
            </RadioGroup>
          </div>

          <div className='content-wrapper'>
            {content}
          </div>
        </Paper>
      </div>
    );
  }
}

export default ModalContent;