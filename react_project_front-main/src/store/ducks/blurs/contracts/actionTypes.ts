import { Action } from 'redux';
import { LoadingStatus } from '../../../types';
import { AddFormState, Blur, BlursState } from './state';

export enum BlursActionsType {
  SET_BLURS = 'blurs/SET_BLURS',
  FETCH_BLURS = 'blurs/FETCH_BLURS',
  SET_LOADING_STATE = 'blurs/SET_LOADING_STATE',
  FETCH_ADD_BLUR = 'blurs/FETCH_ADD_BLUR',
  ADD_BLUR = 'blurs/ADD_BLUR',
  REMOVE_BLUR = 'blurs/REMOVE_BLUR',
  SET_ADD_FORM_STATE = 'blurs/SET_ADD_FORM_STATE',
}

export interface SetBlursActionInterface extends Action<BlursActionsType> {
  type: BlursActionsType.SET_BLURS;
  payload: BlursState['data'];
}

export interface FetchAddBlurActionInterface extends Action<BlursActionsType> {
  type: BlursActionsType.FETCH_ADD_BLUR;
  payload: {
    text: string;
    images: string[];
  };
}

export interface AddBlurActionInterface extends Action<BlursActionsType> {
  type: BlursActionsType.ADD_BLUR;
  payload: Blur;
}

export interface RemoveBlurActionInterface extends Action<BlursActionsType> {
  type: BlursActionsType.REMOVE_BLUR;
  payload: string;
}

export interface FetchBlursActionInterface extends Action<BlursActionsType> {
  type: BlursActionsType.FETCH_BLURS;
}

export interface SetBlursLoadingStatusActionInterface extends Action<BlursActionsType> {
  type: BlursActionsType.SET_LOADING_STATE;
  payload: LoadingStatus;
}

export interface SetAddFormStateActionInterface extends Action<BlursActionsType> {
  type: BlursActionsType.SET_ADD_FORM_STATE;
  payload: AddFormState;
}
