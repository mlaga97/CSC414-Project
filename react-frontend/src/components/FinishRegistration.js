// Library imports
import React from 'react';
import { connect } from 'react-redux';
import { Alert, Card, Container, Row, Col } from 'react-bootstrap';
import { Form, FormGroup, FormControl } from 'react-bootstrap';

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

const TermsAndConditions = ({hidden}) => {
  if (hidden)
    return null;

  return <Alert variant='secondary'>
    <h5>Terms and conditions</h5>
    <hr/>
    <b>General User License Agreement</b>
    <p>You grant us a non-exclusive, transferable, sub-licensable, royalty-free, and worldwide license to host, use, distribute, disseminate, modify, run, copy, exhibit, decipher, translate, and create derivative works of your content.</p>
    <b>Termination</b>
    <p>You can terminate this license any time by deleting your content or account. You should know that, for technical reasons, content you delete may persist for a limited period of time in backup copies (though it will not be visible to other users). In addition, content you delete may continue to appear if you have shared it with others and they have not deleted it.</p>

  </Alert>;
}

class LoginForm extends React.Component {
  constructor() {
    super();

    this.state = {
      submitted: false,
      tacHidden: true,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    console.log(event.target.termsAndConditions);

    let username = event.target.username.value;
    let confirm = event.target.confirm.value;
    let password = event.target.password.value;
    let termsAndConditions = event.target.termsAndConditions.checked;

    console.log(termsAndConditions);

    if (!termsAndConditions) {
      this.setState({
        error: 'You must agree to the terms and conditions!',
      });
      return
    }

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
      error: null,
      submitted: true,
    }), 100);

    this.interval = setTimeout(() => {
      if (this.props.auth.registerStatus) window.location.href = "./"
    }, 1000);
  }

  // TODO: Add back styling
  // TODO: Confirm password
  // TODO: Check for success
  render = () => {
    const URLParams = new URLSearchParams(this.props.location.search);
    let tokenData;

    console.log(this.props.auth);

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

    if (this.state.submitted && this.props.auth.registerStatus)
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
                  <ErrorMessage message={(this.props.auth) ? this.props.auth.registerReason : null} />
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
                    label='Confirm Password'
                    required='required'
                    controlID='formRegisterConfirm'
                  />
                  <TermsAndConditions hidden={this.state.tacHidden} />
                  <input
                    type='checkbox'
                    name='termsAndConditions'
                    id='formRegisterTerms'
                    label='test'
                  /> I agree to the <a href='javascript:void(0)' onClick={() => this.setState({tacHidden: false})}>Terms and Conditions</a>
                  <br/>
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
