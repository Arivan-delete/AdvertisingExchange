import { RootState } from '../../store';
import { LoadingStatus } from '../../types';
import { AddFormState, BlursState } from './contracts/state';

export const selectBlursState = (state: RootState): BlursState => state.blurs;

export const selectLoadingStatus = (state: RootState): LoadingStatus =>
  selectBlursState(state).LoadingStatus;

export const selectAddFormState = (state: RootState): AddFormState =>
  selectBlursState(state).addFormState;

export const selectIsBlursLoading = (state: RootState): boolean =>
  selectLoadingStatus(state) === LoadingStatus.LOADING;

export const selectIsBlursLoaded = (state: RootState): boolean =>
  selectLoadingStatus(state) === LoadingStatus.LOADED;

export const selectBlursItems = (state: RootState) => selectBlursState(state).data;
