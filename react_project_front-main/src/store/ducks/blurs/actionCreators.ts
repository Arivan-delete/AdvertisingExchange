import { LoadingStatus } from '../../types';
import {
  AddBlurActionInterface,
  FetchAddBlurActionInterface,
  FetchBlursActionInterface,
  RemoveBlurActionInterface,
  SetAddFormStateActionInterface,
  SetBlursActionInterface,
  SetBlursLoadingStatusActionInterface,
  BlursActionsType,
} from './contracts/actionTypes';
import { AddFormState, Blur, BlursState } from './contracts/state';

export const setBlurs = (payload: []): SetBlursActionInterface => ({
  type: BlursActionsType.SET_BLURS,
  payload,
});

export const fetchAddBlur = (payload: {
  text: string;
  images: string[];
}): FetchAddBlurActionInterface => ({
  type: BlursActionsType.FETCH_ADD_BLUR,
  payload,
});

export const addBlur = (payload: Blur): AddBlurActionInterface => ({
  type: BlursActionsType.ADD_BLUR,
  payload,
});

export const setBlursLoadingStatus = (
  payload: LoadingStatus,
): SetBlursLoadingStatusActionInterface => ({
  type: BlursActionsType.SET_LOADING_STATE,
  payload,
});

export const setAddFormState = (payload: AddFormState): SetAddFormStateActionInterface => ({
  type: BlursActionsType.SET_ADD_FORM_STATE,
  payload,
});

export const removeBlur = (payload: string): RemoveBlurActionInterface => ({
  type: BlursActionsType.REMOVE_BLUR,
  payload,
});

export const fetchBlurs = (): FetchBlursActionInterface => ({
  type: BlursActionsType.FETCH_BLURS,
});

export type BlursActions =
  | SetBlursActionInterface
  | FetchBlursActionInterface
  | SetBlursLoadingStatusActionInterface
  | FetchAddBlurActionInterface
  | AddBlurActionInterface
  | SetAddFormStateActionInterface
  | RemoveBlurActionInterface;
