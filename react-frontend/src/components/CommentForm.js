// Library imports
import React from 'react';
import { connect } from 'react-redux';
import { Card, Form, Button } from 'react-bootstrap';

// Actions
import actions from '../actions';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

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
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Control type='text' value={this.state.value} onChange={this.handleChange} />
          </Form.Group>
          <a href='javascript:void(0)' onClick={() => this.setState({hidden: true})}>Cancel</a>
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
