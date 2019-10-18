// Actions
import actions from '../../actions';

function list(state = {}, action) {
  switch (action.type) {
    case actions.post.list.succeeded:
      const newState = {};

      // Copy data for any new post IDs that are in the new list
      action.data.forEach((postID) => {
        if (postID in (state || {})) {
          newState[postID] = state[postID];
        } else {
          newState[postID] = null;
        }
      });

      return newState;

    default:
      return state;
  }
}

export default list;
