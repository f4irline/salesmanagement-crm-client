import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';

class ModalContent extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.paper}>
        <Typography variant="h6" id="modal-title">
          Text in a modal
        </Typography>
        <Typography variant="subtitle1" id="simple-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </div>
    );
  }
}

export default ModalContent;