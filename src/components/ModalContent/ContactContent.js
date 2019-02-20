import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class ContactContent extends Component {

  state = {
    date : null,
    company : '',
    person : '',
    phonenumber : '',
    email : ''
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    this.setState({[event.target.name] : event.target.value});
  }

  render() {
    return(
      <div>
        
        <Typography variant='h5' gutterBottom>
          Kontakti
        </Typography>

        <TextField
          id='date'
          name='date'
          label='Päivämäärä'
          type='date'
          InputLabelProps={{
            shrink: true,
          }}
          onChange={this.handleChange}
        />
        <br />

        <TextField
          id='standard-name'
          name='company'
          label='Yrityksen nimi'
          margin='normal'
          onChange={this.handleChange}
        />
        <br />

        <TextField
          id='standard-name'
          name='person'
          label='Yhteyshenkilö'
          margin='normal'
          onChange={this.handleChange}
        />
        <br />

        <TextField
          id='standard-name'
          name='phonenumber'
          label='Puhelinnumero'
          margin='normal'
          onChange={this.handleChange}
        />
        <br />

        <TextField
          id='standard-name'
          name='email'
          label='Sähköposti'
          margin='normal'
          onChange={this.handleChange}
        />
        <br />
        
        <Button variant='contained' onClick={this.props.handleClick(this.state)}>Tallenna</Button>

      </div>
    );
  }

}

export default ContactContent;