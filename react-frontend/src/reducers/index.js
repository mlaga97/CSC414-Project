// Library imports
import { combineReducers } from 'redux';

// Reducers
import auth from './auth';
import post from './post';

// Combine our reducers together
const rootReducer = combineReducers({
  auth, // Authentication information
  post, // Post information
});

export default rootReducer;
