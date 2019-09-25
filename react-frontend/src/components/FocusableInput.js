// Library imports
import React from 'react';
import ReactDOM from 'react-dom';
import { FormGroup, FormLabel, FormControl } from 'react-bootstrap';

class FocusableInput extends React.Component {
  handleClick = (event) => {
    ReactDOM.findDOMNode(this.refs.inputNode).focus();
  };

  render = () => {
    const { label, controlID, ...formControlProps } = this.props;

    return (
      <FormGroup onClick={this.handleClick} >
        <FormLabel>{label}</FormLabel>
        <FormControl ref='inputNode' {...formControlProps} />
      </FormGroup>
    );
  }
}

export default FocusableInput;
