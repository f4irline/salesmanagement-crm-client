import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

class LeadContent extends Component {

  render() {
    return(
      <div>
        <Typography variant="h5" gutterBottom>
            Liidi
        </Typography>

        <TextField
          id="standard-name"
          label="Yrityksen nimi"
          margin="normal"
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