// Library imports
import { call, put } from 'redux-saga/effects';
import axios from 'axios';

// Actions
import actions from '../../actions';

export default function* list() {
  try {
    const response = yield call(() => axios.get('/post'));

    yield put({
      type: actions.post.list.succeeded,
      data: response.data,
    });
  } catch (e) {
    yield put({
      type: actions.post.list.failed,
      message: e.message,
    });
  }
}
