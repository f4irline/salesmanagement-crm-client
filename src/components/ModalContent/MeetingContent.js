import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

class MeetingContent extends Component {

  render() {
    return(
      <div>
        <Typography variant="h5" gutterBottom>
            Tapaaminen
        </Typography>

        <TextField
          id="standard-name"
          label="Tavattava"
          margin="normal"
        />
        <br />
        <TextField
          id="standard-name"
          label="Aika"
          margin="normal"
        />
        <br />
        <TextField
          id="standard-name"
          label="Paikka"
          margin="normal"
        />
      </div>
    );
  }

}

export default MeetingContent;