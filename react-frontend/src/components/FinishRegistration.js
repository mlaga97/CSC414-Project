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

class LoginForm extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();

    // Attempt Login
    this.props.dispatch({
      type: actions.auth.register.requested,
      data: {
        username: event.target.username.value,
        password: event.target.password.value,
      },
    });
  }

  // TODO: Add back styling
  // TODO: Confirm password
  // TODO: Check for success
  render = () => (
    <Container>
      <Row>
        <Col>
          <Card >
            <div class='container'>
              <form onSubmit={this.handleSubmit} className='login' autoComplete='off'>
                {/* <ErrorMessage auth={this.props.auth} /> */}
                <FocusableInput
                  type='text'
                  name='username'
                  label='Username'
                  required='required'
                  autoFocus='autofocus'
                  controlID='formRegisterUsername'
                />
                <FocusableInput
                  type='password'
                  name='password'
                  label='Password'
                  required='required'
                  controlID='formRegisterPassword'
                />
                <FocusableInput
                  type='password'
                  name='confirm'
                  label='Confirm'
                  required='required'
                  controlID='formRegisterConfirm'
                />
                <FormGroup controlId='formLoginSubmit' className='form-group-clear-style'>
                  <FormControl type='submit' name='Login' value='Login' />
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
