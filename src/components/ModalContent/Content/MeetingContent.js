import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';

class MeetingContent extends Component {

  state = {
    date: new Date().toISOString().split('T')[0],
    companyname: '',
    place: '',
    info: '',
    type: 1
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
            Tapaaminen
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
            name='companyname'
            value={this.state.companyname}
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
            name='place'
            label='Paikka'
            onChange={this.handleChange}
            className='content-item'
            variant='outlined'
            required
          />
        </div>

        <Typography variant='h5' className='event-header'>
            Lisätiedot:
        </Typography>

        <div className='info-container'>
          <TextField
            name='info'
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
          size='large'
          className='button-save'
          color='primary'>Tallenna</Button>
      </div>
    );
  }

}

export default MeetingContent;