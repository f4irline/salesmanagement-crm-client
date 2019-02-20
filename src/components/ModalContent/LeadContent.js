import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

class LeadContent extends Component {

  

  state = {
    date: {
      
    }
  }

  /*function handleChange(event) {
    switch(event.target.id) {
      case standard-name:
        this.setState({standard-name: event.target.value})
    }
  }*/

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
          id="standard-name"
          label="Yrityksen nimi"
          margin="normal"
          onChange='handleChange()'
        />
        <br />
        <TextField
          id="standard-name"
          label="Yrityksen toimiala"
          margin="normal"
        />
        <br />
        <TextField
          id="standard-name"
          label="Yrityksen kotisivu"
          margin="normal"
        />
        <br />
        <TextField
          id="standard-name"
          label="Myyjän nimi"
          margin="normal"
        />
        <br />
        <TextField
          id="standard-name"
          label="Yrityksen kotisivu"
          margin="normal"
        />
        
        <Typography variant="h6" gutterBottom>
            Yhteyshenkilö:
        </Typography>

        <TextField
          id="standard-name"
          label="Nimi"
          margin="normal"
        />
        
        <TextField
          id="standard-name"
          label="Rooli"
          margin="normal"
        />
        
        <TextField
          id="standard-name"
          label="Sähköposti"
          margin="normal"
        />
        <br />
      </div>
    );
  }

}

export default LeadContent;