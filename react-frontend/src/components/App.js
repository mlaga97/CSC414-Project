// Library imports
import React from 'react';
import { connect } from 'react-redux';
import { Route, BrowserRouter } from 'react-router-dom';
import { Navbar, Nav, NavItem, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { IndexLinkContainer } from 'react-router-bootstrap';

// Components
import Feed from './Feed';
import TagPage from './TagPage';
import UserPage from './UserPage';
import PostPage from './PostPage';
import CommentForm from './CommentForm';

// Actions
import actions from '../actions';

class App extends React.Component {
  render() {
    const basename = process.env.PUBLIC_URL.replace(/(^\w+:|^)\/\/.*?\//, '');

    return <BrowserRouter basename={basename}>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href='/'>BananaNet</Navbar.Brand>
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

      <div className='page'>
        <Route exact path='/'>
          <Container style={{'marginTop': '60px'}}>
            <Row>
              <Col>
                <Card>
                  <div style={{'margin': '20px'}}>
                    <CommentForm postform/>
                  </div>
                </Card>
                <br />
                  <Feed />
              </Col>
            </Row>
          </Container>
        </Route>
        <Route path='/u/:username' component={UserPage} />
        <Route path='/p/:postID' component={PostPage} />
        <Route path='/t/:tag' component={TagPage} />
      </div>
    </BrowserRouter>
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
