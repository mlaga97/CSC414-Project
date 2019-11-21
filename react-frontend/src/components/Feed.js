// Library imports
import React from 'react';
import { connect } from 'react-redux';
import { Card, Container, Row, Col } from 'react-bootstrap';


// Components
import PostForm from './PostForm';

// Actions
import actions from '../actions';

const Post = ({
  post,
  posts,
}) => {
  if(!post)
    return null;

  if(!post.data)
    return null;

  if(!post.data.body)
    return null;

  return <Card>
    <Card.Body>
      <Card.Title>
        <span>{post.username}</span><span style={{'fontSize': '14px', 'color': '#999999'}}>#{post.userID}</span>
        <span style={{'float': 'right', 'fontSize': '14px', 'color': '#aaaaaa'}} >id:{post.id}</span>
      </Card.Title>
      <Card.Text>{post.data.body}</Card.Text>
      {
        Object.keys(posts).filter((postID) => posts[postID].data.parent == post.id).map((postID) => <Post
          post={posts[postID]}
          posts={posts}
        />)
      }
      <PostForm parent={post.id} />
    </Card.Body>
  </Card>
}


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
    }), 5000);
  }

  render() {
    if (!this.props.post.all) {
      return <div className='content-loading'>Retrieving posts...</div>;
    }

    const posts = this.props.post.all;

    return <React.Fragment>
      {
        Object.keys(posts).filter((postID) => posts[postID] && !posts[postID].data.parent).reverse().map((postID) => {
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
)(Feed);
