import { Action } from 'redux';
import { LoadingStatus } from '../../../types';
import { BlurState } from './state';

export enum BlurActionsType {
  SET_BLUR_DATA = 'blur/SET_BLUR_DATA',
  FETCH_BLUR_DATA = 'blur/FETCH_BLUR_DATA',
  SET_LOADING_STATE = 'blur/SET_LOADING_STATE',
}

export interface SetBlurDataActionInterface extends Action<BlurActionsType> {
  type: BlurActionsType.SET_BLUR_DATA;
  payload: BlurState['data'];
}

export interface FetchBlurDataActionInterface extends Action<BlurActionsType> {
  type: BlurActionsType.FETCH_BLUR_DATA;
  payload: string;
}

export interface SetBlurLoadingStatusActionInterface extends Action<BlurActionsType> {
  type: BlurActionsType.SET_LOADING_STATE;
  payload: LoadingStatus;
}
