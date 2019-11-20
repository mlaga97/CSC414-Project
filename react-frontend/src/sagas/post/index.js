// Library imports
import { takeLatest } from 'redux-saga/effects';

// Actions
import actions from '../../actions';

// Sagas
import all from './all';
import list from './list';
import post from './post';

// Export saga
export default function* () {
  yield takeLatest(actions.post.all.requested, all);
  yield takeLatest(actions.post.list.requested, list);
  yield takeLatest(actions.post.post.requested, post);
};
