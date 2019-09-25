// Librart imports
import { all } from 'redux-saga/effects';

// Sagas
import auth from './auth';

// Export saga
export default function* () {
  yield all([
    auth()
  ]);
}
