import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';

class SalesContent extends Component {

  state = {
    date: new Date().toISOString().split('T')[0],
    companyName: '',
    sum: 0,
    notes: '',
    eventType: 3
  };

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    this.setState({[event.target.name] : event.target.value});
  }

  render() {
  
    return(
      <div className='content-all'>
        <Typography variant='h5' className='event-header'>
            Myynti
        </Typography>

        <div className='secondary-content-fields'>
          <TextField
            name='date'
            label='Päivämäärä'
            type='date'
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.handleChange}
            className='content-item'
            variant='outlined'
            required
            value={this.state.date}
          />

          <Select
            name='companyName'
            label='Yritys'
            value={this.state.companyName}
            onChange={this.handleChange}
            className='content-item'
            input={
              <OutlinedInput
                name="company"
                labelWidth={0}
              />
            }
            required>
            {this.props.leadNames}
          </Select>
          
          <TextField
            name='sum'
            label='Summa'
            onChange={this.handleChange}
            className='content-item'
            variant='outlined'
            type='number'
            required
          />
        </div>

        <Typography variant='h5' className='event-header'>
            Lisätiedot:
        </Typography>

        <div className='info-container'>
          <TextField
            name='notes'
            label='Lisätiedot'
            onChange={this.handleChange}
            className='content-item'
            variant='outlined'
            multiline={true}
            fullWidth={true}
          />
        </div>

        <Button 
          variant='contained' 
          onClick={this.props.handleSend(this.state)}
          color='primary'
          size='large'
          className='button-save'>Tallenna</Button>
      </div>
    );
  }

}

export default SalesContent;