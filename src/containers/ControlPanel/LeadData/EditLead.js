import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const EditLead = (props) => {

  function handleDateChange(event) {
    event.preventDefault();
  }

  return(
    <Grid container direction='column' alignItems='center'>
      <Grid item xs={12} style={{textAlign: 'center'}}>
        <Typography variant='h4' gutterBottom>
          LIIDIN MUOKKAUS
        </Typography>
      </Grid>
      <Grid container>
        <Grid item container justify='center' xs={12} md={6}>
          <TextField
            fullWidth
            variant='outlined'
            disabled
            label='Liidi ID'
            value={props.data.leadId}></TextField>
        </Grid>
        <Grid item container justify='center' xs={12} md={6}>
          <TextField
            label='Luotu'
            fullWidth
            variant='outlined'
            type='date'
            value={props.data.date}></TextField>
        </Grid>
        <Grid item container justify='center' xs={12} md={6}>
          <TextField
            fullWidth
            variant='outlined'
            label='Nimi'
            value={props.data.companyName}></TextField>
        </Grid>
        <Grid item container justify='center' xs={12} md={6}>
          <TextField
            fullWidth
            variant='outlined'
            label='Ala'
            value={props.data.industry}></TextField>
        </Grid>
        <Grid item container justify='center' xs={12} md={6}>
          <TextField
            fullWidth
            variant='outlined'
            label='Yhteyshenkilö'
            value={props.data.contactPerson}></TextField>
        </Grid>
        <Grid item container justify='center' xs={12} md={6}>
          <TextField
            fullWidth
            variant='outlined'
            label='Rooli'
            value={props.data.contactRole}></TextField>
        </Grid>
        <Grid item container justify='center' xs={12} md={6}>
          <TextField
            fullWidth
            variant='outlined'
            label='Puhelin'
            value={props.data.phoneNumber}></TextField>
        </Grid>
        <Grid item container justify='center' xs={12} md={6}>
          <TextField
            fullWidth
            variant='outlined'
            label='Email'
            value={props.data.email}></TextField>
        </Grid>
        <Grid item container justify='center' xs={12} md={6}>
          <TextField
            fullWidth
            variant='outlined'
            label='WWW'
            value={props.data.website}></TextField>
        </Grid>
        <Grid item container justify='center' xs={12} md={6}>
          <TextField
            fullWidth
            variant='outlined'
            label='Huom'
            value={props.data.notes}></TextField>
        </Grid>
      </Grid>
    </Grid> 
  );

};

export default EditLead;