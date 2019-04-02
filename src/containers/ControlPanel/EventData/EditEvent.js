import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const EditEvent = (props) => {
  return (
    <Grid container direction='column' alignItems='center'>
      <Grid item xs={12} style={{textAlign: 'center'}}>
        <Typography variant='h4' gutterBottom>
          TAPAHTUMAN MUOKKAUS
        </Typography>
      </Grid>
      <Grid container>
        <Grid item container justify='center' xs={6}>
          <TextField
            fullWidth
            variant='outlined'></TextField>
        </Grid>
        <Grid item container justify='center' xs={6}>
          <TextField
            variant='outlined'></TextField>
        </Grid>
      </Grid>
    </Grid>  
  );
};

export default EditEvent;