import { RootState } from '../../store';
import { LoadingStatus } from '../../types';
import { Blur } from '../blurs/contracts/state';
import { BlurState } from './contracts/state';

export const selectBlur = (state: RootState): BlurState => state.blur;

export const selectLoadingStatus = (state: RootState): LoadingStatus =>
  selectBlur(state).LoadingStatus;

export const selectIsBlurLoading = (state: RootState): boolean =>
  selectLoadingStatus(state) === LoadingStatus.LOADING;

export const selectIsBlurLoaded = (state: RootState): boolean =>
  selectLoadingStatus(state) === LoadingStatus.LOADED;

export const selectBlurData = (state: RootState): Blur | undefined => selectBlur(state).data;
