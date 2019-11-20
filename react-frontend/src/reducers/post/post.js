// Get action list
import actions from '../../actions';

function post(state = null, action) {
  switch (action.type) {
    case actions.post.post.succeeded:
      return action.data;
    default:
      return state;
  }
}

export default post;
