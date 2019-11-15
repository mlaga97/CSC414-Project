// Library imports
import React from 'react';
import { connect } from 'react-redux';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { FormGroup, FormControl } from 'react-bootstrap';

// Components
import FocusableInput from './FocusableInput';
//import Username from './Username';
//import Password from './Password';
//import LoginButton from './LoginButton';
//import ErrorMessage from './ErrorMessage';

// Actions
import actions from '../actions';

const Email = () => (
  <FocusableInput
    type='text'
    name='email'
    label='Email'
    required='required'
    autoFocus='autofocus'
    controlID='formRegisterEmail'
  />
);

class LoginForm extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();

    // Attempt Login
    this.props.dispatch({
      type: actions.auth.registerlink.requested,
      data: {
        email: event.target.email.value,
      },
    });
  }

  // TODO: Add back styling
  render = () => (
    <Container>
      <Row>
        <Col>
          <Card >
            <div class='container'>
              <form onSubmit={this.handleSubmit} className='login' autoComplete='off'>
                {/* <ErrorMessage auth={this.props.auth} /> */}
                <Email />
                <FormGroup controlId='formLoginSubmit' className='form-group-clear-style'>
                  <FormControl type='submit' name='Register' value='Register' />
                </FormGroup>
              </form>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default connect(
  state => ({
    auth: state.auth,
  }),
  dispatch => ({
    dispatch,
  }),
)(LoginForm);
