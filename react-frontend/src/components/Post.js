// Library imports
import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

// Components
import CommentForm from './CommentForm';

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
        <a href={'/u/' + post.username}>
          <span>{post.username}</span><span style={{'fontSize': '14px', 'color': '#999999'}}>#{post.userID}</span>
        </a>
        <a href={'/p/' + post.id}>
          <span style={{'float': 'right', 'fontSize': '14px', 'color': '#aaaaaa'}} >id:{post.id}</span>
        </a>
      </Card.Title>
      <Card.Text>{post.data.body}</Card.Text>
      {
        Object.keys(posts).filter((postID) => posts[postID].data.parent == post.id).map((postID) => <Post
          post={posts[postID]}
          posts={posts}
        />)
      }
      <CommentForm parent={post.id} />
    </Card.Body>
  </Card>
}

export default Post;
