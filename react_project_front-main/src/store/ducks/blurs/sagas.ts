import { call, put, takeLatest } from 'redux-saga/effects';
import { BlursApi } from '../../../services/api/blursApi';
import { LoadingStatus } from '../../types';
import {
  addBlur,
  setAddFormState,
  setBlurs,
  setBlursLoadingStatus,
} from './actionCreators';
import {
  FetchAddBlurActionInterface,
  RemoveBlurActionInterface,
  BlursActionsType,
} from './contracts/actionTypes';
import { AddFormState, Blur } from './contracts/state';

// export function* fetchBlursRequest() {
//   try {
//     const pathname = window.location.pathname;
//     const userId = pathname.includes('/user') ? pathname.split('/').pop() : undefined;
//     const items: Blur[] = yield call(BlursApi.fetchBlurs, userId);
//     yield put(setBlurs(items));
//   } catch (error) {
//     yield put(setBlursLoadingStatus(LoadingStatus.ERROR));
//   }
// }

export function* fetchBlursRequest() {
  try {
    const items: [] = yield call(BlursApi.fetchBlurs);
    yield put(setBlurs(items));
  } catch (error) {
    yield put(setBlursLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* fetchAddBlurRequest({ payload }: FetchAddBlurActionInterface) {
  try {
    const item: Blur = yield call(BlursApi.addBlur, payload)
    yield put(addBlur(item));
  } catch (error) {
    yield put(setAddFormState(AddFormState.ERROR));
  }
}

export function* fetchRemoveBlurRequrest({ payload }: RemoveBlurActionInterface) {
  try {
    yield call(BlursApi.removeBlur, payload);
  } catch (error) {
    alert('Помилка підчас видалення допису');
  }
}

export function* blursSaga() {
  yield takeLatest(BlursActionsType.FETCH_BLURS, fetchBlursRequest);
  yield takeLatest(BlursActionsType.FETCH_ADD_BLUR, fetchAddBlurRequest);
  yield takeLatest(BlursActionsType.REMOVE_BLUR, fetchRemoveBlurRequrest);
}
