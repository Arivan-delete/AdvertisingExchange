import { call, put, takeEvery } from 'redux-saga/effects';
import { BlursApi } from '../../../services/api/blursApi';
import { LoadingStatus } from '../../types';
import { Blur } from '../blurs/contracts/state';
import { setBlurData, setBlurLoadingStatus } from './actionCreators';
import { FetchBlurDataActionInterface, BlurActionsType } from './contracts/actionTypes';

export function* fetchBlurDataRequest({ payload: blurId }: FetchBlurDataActionInterface) {
  try {
    const data: Blur = yield call(BlursApi.fetchBlurData, blurId);
    yield put(setBlurData(data));
  } catch (error) {
    yield put(setBlurLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* blurSaga() {
  yield takeEvery(BlurActionsType.FETCH_BLUR_DATA, fetchBlurDataRequest);
}
