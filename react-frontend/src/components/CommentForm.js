// Library imports
import React from 'react';
import { connect } from 'react-redux';
import { Alert, Card, Form, Button } from 'react-bootstrap';

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

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      value: ''
    };

    if (this.props.postform) this.state.hidden = false;

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
        parent: this.props.parent,
      },
    });

    this.setState({value: ''});
  }

  render() {
    if (this.state.hidden)
      return <div>
        <a href='javascript:void(0)' onClick={() => this.setState({hidden: false})}>Reply</a>
      </div>
      return <div>
        <ErrorMessage message={this.state.error} />
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Control type='text' value={this.state.value} onChange={this.handleChange} />
          </Form.Group>
          {
            (!this.props.postform) ? <a href='javascript:void(0)' onClick={() => this.setState({hidden: true})}>Cancel</a> : null
          }
          <Button style={{margin: '10px', 'float': 'right'}} type="submit" value="Submit">Post</Button>
        </Form>
        <br/>
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
)(CommentForm);
