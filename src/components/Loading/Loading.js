import React, { Component } from 'react';
import RiseLoader from 'react-spinners/RiseLoader';
import Grid from '@material-ui/core/Grid';

class Loading extends Component {

  render() {
    return(
      <Grid container direction='column' alignItems='center' style={{width: '50vw', height: '50vh', margin: 'auto'}}>
        <Grid item xs={12} style={{textAlign: 'center', marginTop: '40vh', width: '100%', height: '100%'}}>
          <div className='sweet-loading'>
            <RiseLoader
              sizeUnit={'em'}
              size={3}
              color={'#D72322'}
              loading={true}  
            />
          </div>
        </Grid>
      </Grid>
    );
  }

}

export default Loading;