import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const EditUser = (props) => {
  console.log(props);
  return (
    <Grid container direction='column' alignItems='center'>
      <Grid item xs={12} style={{textAlign: 'center'}}>
        <Typography variant='h4' gutterBottom>
          KÄYTTÄJÄN MUOKKAUS
        </Typography>
      </Grid>
    </Grid>
  );
};

export default EditUser;