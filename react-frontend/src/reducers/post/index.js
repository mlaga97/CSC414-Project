// Library imports
import { combineReducers } from 'redux';

// Get action list
import actions from '../../actions';

// Reducers
import all from './all';
import list from './list';
//import post from './post';

export default combineReducers({
  all,
  //post, // TODO: Add post reducer
});
