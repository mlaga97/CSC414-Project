// Library imports
import React from 'react';
import { connect } from 'react-redux';
import {Button} from 'react-bootstrap';

// Actions
import actions from '../actions';

class App extends React.Component {
  render() {
    return <div>
      <p>Hello, world!</p>

      <Button onClick={() => {
        this.props.dispatch({
          type: actions.auth.logout.requested,
        });
      }}>Log Out</Button>
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
