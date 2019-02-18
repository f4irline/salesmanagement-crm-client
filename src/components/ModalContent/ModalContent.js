import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import modalContent from './modalContent.json';

class ModalContent extends Component {

  createElement(type) {

    let elem;

    switch(type) {
      case 'input':
        break;
    }

  }

  buildContent() {
    let jsonObject = modalContent.content;
    
    let globalElements = jsonObject.global;



    let myModal = <div>
      
    </div>;

    return myModal;
  }

  render() {
    return (
      <div>
        {this.buildContent()}
      </div>
    );
  }
}

export default ModalContent;