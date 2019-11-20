// Library imports
import { combineReducers } from 'redux';

// Get action list
import actions from '../../../actions';

// Reducers
import all from './all';
import get from './get';
import list from './list';

// Handle some actions
export default function allReducer(state = null, action) {
  switch (action.type) {
    case actions.post.all.succeeded:
      return all(state, action);
    case actions.post.get.succeeded:
      return get(state, action);
    case actions.post.list.succeeded:
      return list(state, action);
    default:
      return state;
  }
}
