// Library imports
import React from 'react';
import { connect } from 'react-redux';
import { Card, Container, Row, Col } from 'react-bootstrap';

// Components
import Username from './Username';
import Password from './Password';
import LoginButton from './LoginButton';
import ErrorMessage from './ErrorMessage';

// Actions
import actions from '../../actions';

class LoginForm extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();

    // Attempt Login
    this.props.dispatch({
      type: actions.auth.login.requested,
      data: {
        username: event.target.username.value,
        password: event.target.password.value,
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
                <ErrorMessage auth={this.props.auth} />
                <Username />
                <Password />
                <LoginButton />
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
