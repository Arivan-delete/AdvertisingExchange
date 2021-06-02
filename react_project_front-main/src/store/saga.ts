import { all } from 'redux-saga/effects';
import { blursSaga } from './ducks/blurs/sagas';
import { tagsSaga } from './ducks/tags/sagas';
import { blurSaga } from './ducks/blur/sagas';
import { userSaga } from './ducks/user/sagas';
import { usersSaga } from './ducks/users/sagas';

export default function* rootSaga() {
  yield all([blursSaga(), tagsSaga(), blurSaga(), userSaga(), usersSaga()]);
}
