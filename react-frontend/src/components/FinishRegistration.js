// Library imports
import React from 'react';
import { connect } from 'react-redux';
import { Alert, Card, Container, Row, Col } from 'react-bootstrap';
import { FormGroup, FormControl } from 'react-bootstrap';

// Components
import FocusableInput from './FocusableInput';

// Actions
import actions from '../actions';

const ErrorMessage = ({message}) => {
  // Don't show if we don't have an error message
  if (!message) {
    return null;
  }

  // Show Alert containing error from server
  return <Alert variant='danger'>{message}</Alert>;
};

class LoginForm extends React.Component {
  constructor() {
    super();

    this.state = {
      submitted: false,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    let username = event.target.username.value;
    let confirm = event.target.confirm.value;
    let password = event.target.password.value;

    if (!username) {
      this.setState({
        error: 'Empty username!',
      });
      return
    }

    if (confirm !== password) {
      this.setState({
        error: 'Passwords do not match!',
      });
      return
    }

    // Attempt Login
    this.props.dispatch({
      type: actions.auth.register.requested,
      data: {
        token: this.token,
        username: event.target.username.value,
        password: event.target.password.value,
      },
    });

    this.username = event.target.username.value;
    this.setState({
      error: 'Submitting...',
    });

    // TODO: Actually do correctly
    this.interval = setTimeout(() => this.setState({
      submitted: true,
    }), 100);
  }

  // TODO: Add back styling
  // TODO: Confirm password
  // TODO: Check for success
  render = () => {
    const URLParams = new URLSearchParams(this.props.location.search);
    let tokenData;

    // TODO: Redirect
    if (!URLParams.has('token'))
      return 'No registration token!';

    this.token = URLParams.get('token');
    try {
      tokenData = JSON.parse(atob(this.token));
    } catch(e) {
      return 'Invalid registration token!';
    }

    console.log(tokenData);

    // TODO: Actually check something
    if (!tokenData.email || !tokenData.timestamp || !tokenData.uuid)
      return 'Invalid registration token!';

    if (this.state.submitted)
      return (
        <Container>
          <Row>
            <Col>
              <Card >
                <div class='container'>
                  <h3>Username '{this.username}' registered!</h3>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      )

    return (
      <Container>
        <Row>
          <Col>
            <Card >
              <div class='container'>
                <form onSubmit={this.handleSubmit} className='login' autoComplete='off'>
                  <ErrorMessage message={this.state.error} />
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
                    <FormControl type='submit' name='Register' value='Register' />
                  </FormGroup>
                </form>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect(
  state => ({
    auth: state.auth,
  }),
  dispatch => ({
    dispatch,
  }),
)(LoginForm);
