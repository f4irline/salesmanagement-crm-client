import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const EditLead = (props) => {

  return(
    <Grid container direction='column' alignItems='center'>
      <Grid item xs={12} style={{textAlign: 'center'}}>
        <Typography variant='h4' gutterBottom>
          LIIDIN MUOKKAUS
        </Typography>
      </Grid>
      <Grid container>
        <Grid item container justify='center' xs={12} md={6} lg={3}>
          <TextField
            fullWidth
            variant='outlined'
            disabled
            label='Liidi ID'></TextField>
        </Grid>
        <Grid item container justify='center' xs={12} md={6} lg={3}>
          <TextField
            fullWidth
            variant='outlined'
            label='Luotu'></TextField>
        </Grid>
        <Grid item container justify='center' xs={12} md={6} lg={3}>
          <TextField
            fullWidth
            variant='outlined'
            label='Nimi'></TextField>
        </Grid>
        <Grid item container justify='center' xs={12} md={6} lg={3}>
          <TextField
            fullWidth
            variant='outlined'
            label='Ala'></TextField>
        </Grid>
        <Grid item container justify='center' xs={12} md={6} lg={3}>
          <TextField
            fullWidth
            variant='outlined'
            label='Yhteyshenkilö'></TextField>
        </Grid>
        <Grid item container justify='center' xs={12} md={6} lg={3}>
          <TextField
            fullWidth
            variant='outlined'
            label='Rooli'></TextField>
        </Grid>
        <Grid item container justify='center' xs={12} md={6} lg={3}>
          <TextField
            fullWidth
            variant='outlined'
            label='Puhelin'></TextField>
        </Grid>
        <Grid item container justify='center' xs={12} md={6} lg={3}>
          <TextField
            fullWidth
            variant='outlined'
            label='Email'></TextField>
        </Grid>
        <Grid item container justify='center' xs={12} md={6} lg={3}>
          <TextField
            fullWidth
            variant='outlined'
            label='WWW'></TextField>
        </Grid>
        <Grid item container justify='center' xs={12} md={6} lg={3}>
          <TextField
            fullWidth
            variant='outlined'
            label='Huom'></TextField>
        </Grid>
      </Grid>
    </Grid> 
  );

};

export default EditLead;