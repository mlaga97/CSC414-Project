// Librart imports
import { all } from 'redux-saga/effects';

// Sagas
import auth from './auth';
import post from './post';

// Export saga
export default function* () {
  yield all([
    auth(),
    post()
  ]);
}
