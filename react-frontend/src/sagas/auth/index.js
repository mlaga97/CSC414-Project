// Library imports
import { takeLatest } from 'redux-saga/effects';

// Actions
import actions from '../../actions';

// Sagas
import login from './login';
import logout from './logout';
import status from './status';
import register from './register';
import registerlink from './registerlink';

// Export saga
export default function* () {
  yield takeLatest(actions.auth.login.requested, login);
  yield takeLatest(actions.auth.logout.requested, logout);
  yield takeLatest(actions.auth.status.requested, status);
  yield takeLatest(actions.auth.register.requested, register);
  yield takeLatest(actions.auth.registerlink.requested, registerlink);
}
