import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class MeetingContent extends Component {

  state = {
    date : null,
    companyname : '',
    place : ''
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
      <div>
        <Typography variant='h5' gutterBottom>
            Tapaaminen
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
          name='companyname'
          label='Tavattava'
          margin='normal'
          onChange={this.handleChange}
        />
        <br />

        <TextField
          id='standard-name'
          name='place'
          label='Paikka'
          margin='normal'
          onChange={this.handleChange}
        />
        <br />

        <Button variant='contained' onClick={this.props.handleClick(this.state)}>Tallenna</Button>
      </div>
    );
  }

}

export default MeetingContent;