import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class OfferContent extends Component {

  state = {
    date: null,
    company: '',
    sum: 0,
    info: ''
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
            Tarjous
        </Typography>

        <div className='content-fields'>
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
            value={new Date().toISOString().split('T')[0]}
          />
          <TextField
            name='company'
            label='Yritys'
            onChange={this.handleChange}
            className='content-item'
            variant='outlined'
            required
          />
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

        <Typography variant="h5" className='event-header'>
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
          onClick={this.props.handleClick(this.state)}
          color='primary'
          size='large'
          className='button-save'>Tallenna</Button>
      </div>
    );
  }

}

export default OfferContent;