// Library imports
import { call, put } from 'redux-saga/effects';
import axios from 'axios';

// Actions
import actions from '../../actions';

export default function* all() {
  try {
    const response = yield call(() => axios.get('/post/all'));

    yield put({
      type: actions.post.all.succeeded,
      data: response.data,
    });
  } catch (e) {
    yield put({
      type: actions.post.all.failed,
      message: e.message,
    });
  }
}
