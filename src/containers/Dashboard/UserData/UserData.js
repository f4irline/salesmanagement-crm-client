import React from 'react';
import { Component } from 'react';
import './UserData.css';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import { List, ListItemText, ListItem } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

import {print} from '../../../utils/Debug';

const styles = {
  itemContainer: {
    height: '100%'
  },
  listItem: {
    padding: '0.5vh 1vw'
  },
  paper: {
    margin: '1vw',
    padding: '0.5vw'
  },
  header: {
    margin: '1vh 0.5vw 0 0.5vw',
    padding: '0 0.5vw',
    textTransform: 'uppercase',
    fontWeight: 800
  },
  login: {
    margin: '0 1vw',
    padding: '0 1vw'
  }
};

class UserData extends Component {
  state = {
    user: this.props.user,
    name: this.props.name,
    userData: this.props.userData
  }

  render() {

    print('UserData', 'render');

    const { classes } = this.props;

    return (
      <Grid item xs={12} lg={5} className='UserData' style={{minHeight: '46vh'}}>
        <Typography variant='h2' classes={{root: classes.header}}>
          Hei, {this.state.user.name}
        </Typography>
        <Typography variant="h5" classes={{root: classes.login}}>
          Sisäänkirjautunut viimeksi: {this.state.user.lastLogin}
        </Typography>
        <Paper elevation={5} classes={{root: classes.paper}}>
          <div>
            <List>
              <ListItem classes={{root: classes.listItem}}>
                <Grid item xs={6}>
                  <ListItemText primary={'Hit Rate %:'}></ListItemText>
                </Grid>
                <Grid item xs={6}>
                  <ListItemText primary={this.state.userData.hit_rate}></ListItemText>
                </Grid>
              </ListItem>
              <Divider variant='middle'/>
              <ListItem classes={{root: classes.listItem}}>
                <Grid item xs={6}>
                  <ListItemText primary={'Keskim. myynti:'}></ListItemText>
                </Grid>
                <Grid item xs={6}>
                  <ListItemText primary={this.state.userData.avg_sales}></ListItemText>
                </Grid>
              </ListItem>
              <Divider variant='middle'/>
              <ListItem classes={{root: classes.listItem}}>
                <Grid item xs={6}>
                  <ListItemText primary={'Kokonaismyynti:'}></ListItemText>
                </Grid>
                <Grid item xs={6}>
                  <ListItemText primary={this.state.userData.total_sales}></ListItemText>
                </Grid>
              </ListItem>
              <Divider variant='middle'/>
              <ListItem classes={{root: classes.listItem}}>
                <Grid item xs={6}>
                  <ListItemText primary={'Yhteydenotot:'}></ListItemText>
                </Grid>
                <Grid item xs={6}>
                  <ListItemText primary={this.state.userData.contacts_amount}></ListItemText>
                </Grid>
              </ListItem>
              <Divider variant='middle'/>
              <ListItem classes={{root: classes.listItem}}>
                <Grid item xs={6}>
                  <ListItemText primary={'Tapaamiset:'}></ListItemText>
                </Grid>
                <Grid item xs={6}>
                  <ListItemText primary={this.state.userData.meetings_amount}></ListItemText>
                </Grid>
              </ListItem>
              <Divider variant='middle'/>
              <ListItem classes={{root: classes.listItem}}>
                <Grid item xs={6}>
                  <ListItemText primary={'Tarjoukset:'}></ListItemText>
                </Grid>
                <Grid item xs={6}>
                  <ListItemText primary={this.state.userData.offers_amount}></ListItemText>
                </Grid>
              </ListItem>
              <Divider variant='middle'/>
              <ListItem classes={{root: classes.listItem}}>
                <Grid item xs={6}>
                  <ListItemText primary={'Sopimukset:'}></ListItemText>
                </Grid>
                <Grid item xs={6}>
                  <ListItemText primary={this.state.userData.deals_amount}></ListItemText>
                </Grid>
              </ListItem>
              <Divider variant='middle'/>
              <ListItem classes={{root: classes.listItem}}>
                <Grid item xs={6}>
                  <ListItemText primary={'Myynnin tavoite:'}></ListItemText>
                </Grid>
                <Grid item xs={6}>
                  <ListItemText primary={this.state.userData.goal}></ListItemText>
                </Grid>
              </ListItem>
            </List>
          </div>
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(UserData);