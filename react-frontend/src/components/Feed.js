// Library imports
import React from 'react';
import { connect } from 'react-redux';
import { Card, Container, Row, Col } from 'react-bootstrap';

// Actions
import actions from '../actions';

class Feed extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: actions.post.list.requested,
    });

    this.props.dispatch({
      type: actions.post.all.requested,
    });

    this.interval = setInterval(() => this.props.dispatch({
      type: actions.post.all.requested,
    }), 1000);
  }

  render() {
    if (!this.props.post.all) {
      return <div className='content-loading'>Retrieving posts...</div>;
    }

    return <React.Fragment>
      {
        Object.keys(this.props.post.all).reverse().map((postID) => {
          const post = this.props.post.all[postID];

          if(!post)
            return null;

          if(!post.data)
            return null;

          if(!post.data.body)
            return null;

          return <div style={{margin: '10px'}}>
            <Card>
              <Card.Body>
                <Card.Title>
                  <span>{post.username}</span><span style={{'fontSize': '14px', 'color': '#999999'}}>#{post.userID}</span>
                  <span style={{'float': 'right', 'fontSize': '14px', 'color': '#aaaaaa'}} >id:{post.id}</span>
                </Card.Title>
                <Card.Text>{post.data.body}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        })
      }
    </React.Fragment>
  }
}

export default connect(
  state => ({
    post: state.post,
  }),
  dispatch => ({
    dispatch,
  }),
)(Feed);
