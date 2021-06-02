import { LoadingStatus } from '../../types';
import {
  FetchBlurDataActionInterface,
  SetBlurDataActionInterface,
  SetBlurLoadingStatusActionInterface,
  BlurActionsType,
} from './contracts/actionTypes';
import { BlurState } from './contracts/state';

export const setBlurData = (payload: BlurState['data']): SetBlurDataActionInterface => ({
  type: BlurActionsType.SET_BLUR_DATA,
  payload,
});

export const setBlurLoadingStatus = (
  payload: LoadingStatus,
): SetBlurLoadingStatusActionInterface => ({
  type: BlurActionsType.SET_LOADING_STATE,
  payload,
});

export const fetchBlurData = (payload: string): FetchBlurDataActionInterface => ({
  type: BlurActionsType.FETCH_BLUR_DATA,
  payload,
});

export type BlurActions =
  | SetBlurDataActionInterface
  | FetchBlurDataActionInterface
  | SetBlurLoadingStatusActionInterface;
