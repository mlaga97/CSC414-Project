// Library imports
import { call, put } from 'redux-saga/effects';
import axios from 'axios';

// Actions
import actions from '../../actions';

/**
 * Attempts to send the user a confirmation email
 *
 * @param {Object} action - Action object.
 * @param {string} action.data.email - The username to attempt login with.
 */
export default function* registerLink(action) {
  const { succeeded, failed } = actions.auth.registerlink;

  try {
    const response = yield call(() => axios.post('/auth/registerlink', action.data));

    yield put({
      type: response.data.success ? succeeded : failed,
      data: response.data,
    });
  } catch (e) {
    yield put({
      type: failed,
      message: e.message,
    });
  }
}
