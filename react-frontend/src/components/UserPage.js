// Library imports
import React from 'react';
import { connect } from 'react-redux';
import { Card, Container, Row, Col } from 'react-bootstrap';

// Components
import Post from './Post';

// Actions
import actions from '../actions';

class UserPage extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: actions.post.all.requested,
    });

    this.interval = setInterval(() => this.props.dispatch({
      type: actions.post.all.requested,
    }), 5000);
  }

  render() {
    if (!this.props.post.all) {
      return <div className='content-loading'>Retrieving posts...</div>;
    }

    const posts = this.props.post.all;
    const username = this.props.match.params.username;

    return <React.Fragment>
      {
        Object.keys(posts).filter((postID) => posts[postID] && posts[postID].username == username).reverse().map((postID) => {
          return <Post 
            post={posts[postID]}
            posts={posts}
          />
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
)(UserPage);
