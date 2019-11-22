// Library imports
import React from 'react';
import { connect } from 'react-redux';
import { Card, Form, Button } from 'react-bootstrap';

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

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.value.length > 1000) {
      this.setState({error: 'Message exceeds character limit!'});
      return
    }

    this.props.dispatch({
      type: actions.post.post.requested,
      data: {
        body: this.state.value,
        clientTime: Date.now(),
      },
    });

    this.setState({value: ''});
  }

  render() {
    return  <div style={{margin: '10px'}}>
      <Card>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group style={{margin: '10px'}}>
            <Form.Control type='text' value={this.state.value} onChange={this.handleChange} />
          </Form.Group>
          <Button style={{margin: '10px', 'float': 'right'}} type="submit" value="Submit">Post</Button>
        </Form>
      </Card>
    </div>
  }
}

export default connect(
  state => ({
    post: state.post,
  }),
  dispatch => ({
    dispatch,
  }),
)(PostForm);
