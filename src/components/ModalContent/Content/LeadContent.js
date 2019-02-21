import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class LeadContent extends Component {

  

  state = {
    date : null,
    companyname : '',
    businessarea : '',
    website : '',
    salesperson : '',
    personname : '',
    personrole : '',
    personemail : ''
  }

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    /*data = {
      name: 'ossi',
      branch: 'ossi'
    }*/
    
    return(
      <div>
        <Typography variant="h5" gutterBottom>
            Liidi
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
          id="standard-name"
          name='companyname'
          label="Yrityksen nimi"
          margin="normal"
          onChange={this.handleChange}
        />
        <br />
        <TextField
          id="standard-name"
          name='businessarea'
          label="Yrityksen toimiala"
          margin="normal"
          onChange={this.handleChange}
        />
        <br />
        <TextField
          id="standard-name"
          name='website'
          label="Yrityksen kotisivu"
          margin="normal"
          onChange={this.handleChange}
        />
        <br />
        <TextField
          id="standard-name"
          name='salesperson'
          label="Myyjän nimi"
          margin="normal"
          onChange={this.handleChange}
        />
        <br />
        
        <Typography variant="h6" gutterBottom>
            Yhteyshenkilö:
        </Typography>

        <TextField
          id="standard-name"
          name='personname'
          label="Nimi"
          margin="normal"
          onChange={this.handleChange}
        />
        
        <TextField
          id="standard-name"
          name='personrole'
          label="Rooli"
          margin="normal"
          onChange={this.handleChange}
        />
        
        <TextField
          id="standard-name"
          name='personemail'
          label="Sähköposti"
          margin="normal"
          onChange={this.handleChange}
        />
        <br />

        <Button variant='contained' onClick={this.props.handleClick(this.state)}>Tallenna</Button>

      </div>
    );
  }

}

export default LeadContent;