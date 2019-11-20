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

const RegistrationForm = ({
  onSubmit,
}) => (
  <Container>
    <Row>
      <Col>
        <Card >
          <div class='container'>
            <form onSubmit={onSubmit} className='login' autoComplete='off'>
              {/* <ErrorMessage auth={this.props.auth} /> */}
              <Email />
              <FormGroup controlId='formLoginSubmit' className='form-group-clear-style'>
                <FormControl type='submit' name='Send Confirmation Email' value='Send Confirmation Email' />
              </FormGroup>
            </form>
          </div>
        </Card>
      </Col>
    </Row>
  </Container>
);

const EmailConfirmationSent = ({email}) => (
  <Container>
    <Row>
      <Col>
        <Card >
          <div class='container'>
            <h3>Email confirmation sent to {email}!</h3>
          </div>
        </Card>
      </Col>
    </Row>
  </Container>
);

class LoginForm extends React.Component {
  constructor() {
    super();

    this.state = {
      submitted: false,
      email: '',
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    // Attempt Login
    this.props.dispatch({
      type: actions.auth.registerlink.requested,
      data: {
        email: event.target.email.value,
      },
    });

    // Store email for next stage
    this.setState({
      email: event.target.email.value,
    });

    // TODO: Actually do correctly
    this.interval = setTimeout(() => this.setState({
      submitted: true,
    }), 100);
  }

  // TODO: Add back styling
  render() {
    if (this.state.submitted)
      return <EmailConfirmationSent email={this.state.email} />

    return <RegistrationForm onSubmit={this.handleSubmit} />
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
