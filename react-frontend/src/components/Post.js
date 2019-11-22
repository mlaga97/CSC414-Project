// Library imports
import React from 'react';
import { Alert, Card, Container, Row, Col } from 'react-bootstrap';

// Components
import CommentForm from './CommentForm';

const CommentCount = ({count}) => {
  if (count == 0)
    return "0 replies";

  if (count == 1)
    return "1 replies";

  if (count > 1)
    return count + " replies";
}


// Source: https://stackoverflow.com/a/23259289
var timeSince = function(date) {
  if (typeof date !== 'object') {
    date = new Date(date);
  }

  var seconds = Math.floor((new Date() - date) / 1000);
  var intervalType;

  var interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    intervalType = 'year';
  } else {
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      intervalType = 'month';
    } else {
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        intervalType = 'day';
      } else {
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
          intervalType = "hour";
        } else {
          interval = Math.floor(seconds / 60);
          if (interval >= 1) {
            intervalType = "minute";
          } else {
            interval = seconds;
            intervalType = "second";
          }
        }
      }
    }
  }

  if (interval > 1 || interval === 0) {
    intervalType += 's';
  }

  return interval + ' ' + intervalType;
};


const CommentDate = ({timestamp}) => {
  return timeSince(timestamp) + ' ago';
}

const ErrorMessage = ({message, onClose}) => {
  // Don't show if we don't have an error message
  if (!message) {
    return null;
  }

  // Show Alert containing error from server
  return <Alert variant='warning' dismissible onClose={onClose}>{message}</Alert>;
};

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const {post, posts} = this.props;

    if(!post)
      return null;

    if(!post.data)
      return null;

    if(!post.data.body)
      return null;

    const children = Object.keys(posts).filter((postID) => posts[postID].data.parent == post.id);

    return <Card>
      <Card.Body>
        <Card.Title>
          <ErrorMessage message={this.state.error} onClose={() => this.setState({error: null})} />
          <div style={{'margin': '10px'}}>
            <a href={'/u/' + post.username}>
              <span>{post.username}</span><span style={{'fontSize': '14px', 'color': '#999999'}}>#{post.userID}</span>
            </a>
            <span style={{'float': 'right', 'fontSize': '14px', 'color': '#aaaaaa'}} >
              <a href='javascript:void(0)' onClick={() => this.setState({error: 'Thanks for letting us know. We will look into it soon.'})} style={{'color': '#aaaaaa'}}>
                Report
              </a>
            </span>
          </div>
        </Card.Title>
        <Card.Text>
          <div style={{'margin': '10px'}}>
            <h4>
              {post.data.body}
            </h4>
          </div>
        </Card.Text>
        <hr/>
        <div style={{'margin': '10px'}}>
          <span style={{'fontSize': '14px', 'color': '#aaaaaa'}} >
            <CommentCount count={children.length} />
          </span>
          <span style={{'float': 'right', 'fontSize': '14px', 'color': '#aaaaaa'}} >
            <a href={'/p/' + post.id} style={{'color': '#aaaaaa'}}>
              <CommentDate timestamp={post.data.clientTime} />
            </a>
          </span>
        </div>
        <hr/>
        <div style={{'margin': '10px'}}>
          <CommentForm parent={post.id} />
        </div>
        {
          children.map((postID) => <Post
            post={posts[postID]}
            posts={posts}
          />)
        }
      </Card.Body>
    </Card>
  }
}

export default Post;
