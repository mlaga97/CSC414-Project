// Library imports
import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, Button, Card, Container, Row, Col } from 'react-bootstrap';

// Components
import Feed from './Feed';
import PostForm from './PostForm';

// Actions
import actions from '../actions';

class App extends React.Component {
  render() {
    return <div>
      <Navbar bg="dark" variant="dark" fixed='top'>
        <Navbar.Brand>BananaNet</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <Button onClick={() => {
              this.props.dispatch({
                type: actions.auth.logout.requested,
              });
            }}>Log Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container style={{'marginTop': '60px'}}>
        <Row>
          <Col>
            <PostForm />
            <Feed />
          </Col>
        </Row>
      </Container>

    </div>
  }
}

export default connect(
  state => ({
    auth: state.auth,
  }),
  dispatch => ({
    dispatch,
  }),
)(App);
