import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';

class LeadContent extends Component {
  state = {
    date: new Date().toISOString().split('T')[0],
    companyName: '',
    contactPerson: '',
    contactRole: '',
    typedContactRole: '',
    phoneNumber: '',
    email: '',
    industry: '',
    meeted: '',
    discussion: [],
    potential: '',
    notes: '',
    eventType: 4,
    labelWidth: 0
  }

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleCheckbox = event => {
    if (this.state.discussion.includes(event.target.value)) {
      let newDiscussions = [];
      for (const discussion of this.state.discussion) {
        if (discussion !== event.target.value) {
          newDiscussions.push(discussion);
        }
      }
      this.setState({discussion: newDiscussions});
    } else {
      let newDiscussions = [...this.state.discussion, event.target.value];
      this.setState({discussion: newDiscussions});
    }
  }

  mapIndustries = (industries) => {
    industries = industries.map(industry => {
      return <MenuItem key={industry} value={industry}>{industry}</MenuItem>;
    });

    return industries;
  }

  render() {
    let industries = [
      'Startupit', 'IT-ala', 'Teollisuus', 'Politiikka', 'Henkilöstövuokraus', 'Insinööritoimistot', 'Konsultointitoimisto', 'Palveluala', 'Muu'
    ];
      
    industries = this.mapIndustries(industries);

    return(
      <Grid container direction='column' alignItems='center'>
      
        <Typography variant='h5' className='event-header'>
            Liidi
        </Typography>

        <Grid item xs={12} container direction='row'>
          <Grid item xs={12} md={4} style={{padding: '0 0.5vw'}}>
            <TextField
              name='date'
              label='Päivämäärä'
              type='date'
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChange}
              variant='outlined'
              required
              value={this.state.date}
            />
          </Grid>
          <Grid item xs={12} md={4} style={{padding: '0 0.5vw'}}>
            <TextField
              name='companyName'
              label='Yrityksen nimi'
              fullWidth
              onChange={this.handleChange}
              variant='outlined'
              required
            />
          </Grid>
          <Grid item xs={12} md={4} style={{padding: '0 0.5vw'}}>
            <FormControl fullWidth variant='outlined'>
              <InputLabel
                ref={ref => {
                  this.InputLabelRef = ref;
                }}
                htmlFor='outlined-industry'
              >
              Toimiala
              </InputLabel>
              <Select
                name='industry'
                displayEmpty
                value={this.state.industry}
                onChange={this.handleChange}
                input={
                  <OutlinedInput
                    name='industry'
                    labelWidth={this.state.labelWidth}
                    id='outlined-industry'
                  />
                }
                required>
                {industries}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      
        <Typography variant='h5' className='event-header'>
            Yhteyshenkilö:
        </Typography>
        
        <Grid item xs={12} container justify='center'>
          <Grid item xs={12} md={4} style={{padding: '0 0.5vw'}}>
            <TextField
              name='contactPerson'
              fullWidth
              label='Nimi'
              onChange={this.handleChange}
              variant='outlined'
              required
            />
          </Grid>
          <Grid item xs={12} md={4} style={{padding: '0 0.5vw'}}>
            <TextField
              fullWidth
              name='email'
              label='Sähköposti'
              onChange={this.handleChange}
              variant='outlined'
            />
          </Grid>
          <Grid item xs={12} md={4} style={{padding: '0 0.5vw'}}>
            <TextField
              fullWidth
              name='phoneNumber'
              label='Puhelinnumero'
              onChange={this.handleChange}
              variant='outlined'
            />
          </Grid>
        </Grid>
        <Grid item container xs={12} style={{margin: '2vh 0'}}>
          <FormControl component='fieldset' style={{margin: '0 1vw'}}>
            <FormLabel component='legend'>Rooli</FormLabel>
            <RadioGroup
              row
              aria-label='Rooli'
              name='contactRole'
              value={this.state.contactRole}
              onChange={this.handleChange}
            >
              <FormControlLabel
                value='Johto'
                control={<Radio color='primary' />}
                label='Johto'
              />
              <FormControlLabel
                value='Markkinointi'
                control={<Radio color='primary' />}
                label='Markkinointi'
              />
              <FormControlLabel
                value='Myynti'
                control={<Radio color='primary' />}
                label='Myynti'
              />
              <FormControlLabel
                value='HR'
                control={<Radio color='primary' />}
                label='HR'
              />
              <FormControlLabel
                value='Muu'
                control={<Radio color='primary' />}
                label='Muu'
              />
            </RadioGroup>
            <TextField
              name='typedContactRole'
              label='Muu'
              onChange={this.handleChange}
              disabled={this.state.contactRole !== 'Muu'} />
          </FormControl>
        </Grid>
        <Grid item container xs={12} style={{margin: '2vh 0'}}>
          <FormControl component='fieldset' style={{margin: '0 1vw'}}>
            <FormLabel component='legend'>Tavattu</FormLabel>
            <RadioGroup
              row
              aria-label='Tavattu'
              name='meeted'
              value={this.state.value}
              onChange={this.handleChange}
            >
              <FormControlLabel
                value='prospektointi'
                control={<Radio color='primary' />}
                label='Prospektointi'
              />
              <FormControlLabel
                value='messut'
                control={<Radio color='primary' />}
                label='Messut'
              />
              <FormControlLabel
                value='suositus'
                control={<Radio color='primary' />}
                label='Suositus'
              />
              <FormControlLabel
                value='seminaarit'
                control={<Radio color='primary' />}
                label='Seminaarit'
              />
              <FormControlLabel
                value='proakatemia'
                control={<Radio color='primary' />}
                label='Proakatemia'
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item container xs={12} style={{margin: '2vh 0'}}>
          <FormControl row component='fieldset' style={{margin: '0 1vw'}}>
            <FormLabel component='legend'>Mistä juteltu</FormLabel>
            <FormGroup 
              row
              onChange={this.handleCheckbox}>
              <FormControlLabel
                control={
                  <Checkbox
                    value="Työnantajabrändi (traileri)"
                    color="primary"
                  />
                }
                label="Työnantajabrändi (traileri)"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="Yritysvideo"
                    color="primary"
                  />
                }
                label="Yritysvideo"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="Yritysilme"
                    color="primary"
                  />
                }
                label="Yritysilme"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="Laajempi kokonaisuus"
                    color="primary"
                  />
                }
                label="Laajempi kokonaisuus"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="Valokuvaukset"
                    color="primary"
                  />
                }
                label="Valokuvaukset"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item container xs={12} justify='center' style={{margin: '2vh 0'}}>
          <FormControl component='fieldset' style={{margin: '0 1vw'}}>
            <FormLabel component='legend'>Potentiaali</FormLabel>
            <RadioGroup
              row
              name='potential'
              value={this.state.potential}
              onChange={this.handleChange}
            >
              <FormControlLabel
                value='1'
                control={<Radio color='primary' />}
                label='1'
              />
              <FormControlLabel
                value='2'
                control={<Radio color='primary' />}
                label='2'
              />
              <FormControlLabel
                value='3'
                control={<Radio color='primary' />}
                label='3'
              />
              <FormControlLabel
                value='4'
                control={<Radio color='primary' />}
                label='4'
              />
              <FormControlLabel
                value='5'
                control={<Radio color='primary' />}
                label='5'
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Typography variant='h5' className='event-header'>
            Lisätiedot:
        </Typography>

        <div className='info-container'>
          <TextField
            name='notes'
            label='Lisätiedot'
            onChange={this.handleChange}
            className='content-item'
            variant='outlined'
            multiline={true}
            fullWidth={true}
          />
        </div>

        <Button 
          variant='contained' 
          color='primary' 
          onClick={this.props.handleSend(this.state)}
          size='large'
          className='button-save'>Tallenna</Button>

      </Grid>
    );
  }

}

export default LeadContent;