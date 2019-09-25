// Library imports
import { combineReducers } from 'redux';

// Reducers
import auth from './auth';

// Combine our reducers together
const rootReducer = combineReducers({
  auth, // Authentication information
});

export default rootReducer;
