// Library imports
import { call, put } from 'redux-saga/effects';
import axios from 'axios';

// Actions
import actions from '../../actions';

export default function* post(action) {
  const { succeeded, failed } = actions.post.post;

  try {
    const response = yield call(() => axios.post('/post', action.data));

    yield put({
      type: response.data.success ? succeeded : failed,
      data: response.data,
    });

    yield put({
      type: actions.post.all.requested,
    });
  } catch (e) {
    yield put({
      type: failed,
      message: e.message,
    });
  }
}
