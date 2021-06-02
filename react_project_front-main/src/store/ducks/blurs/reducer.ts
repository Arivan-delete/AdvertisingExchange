import produce, { Draft } from 'immer';
import { LoadingStatus } from '../../types';
import { BlursActions } from './actionCreators';
import { BlursActionsType } from './contracts/actionTypes';
import { AddFormState, BlursState } from './contracts/state';

const initialBlursState: BlursState = {
  data: [],
  addFormState: AddFormState.NEVER,
  LoadingStatus: LoadingStatus.NEVER,
};

export const blursReducer = produce((draft: Draft<BlursState>, action: BlursActions) => {
  switch (action.type) {
    case BlursActionsType.SET_BLURS:
      draft.data = action.payload;
      draft.LoadingStatus = LoadingStatus.LOADED;
      break;

    case BlursActionsType.FETCH_BLURS:
      draft.data = [];
      draft.LoadingStatus = LoadingStatus.LOADING;
      break;

    case BlursActionsType.SET_LOADING_STATE:
      draft.LoadingStatus = action.payload;
      break;

    case BlursActionsType.SET_ADD_FORM_STATE:
      draft.addFormState = action.payload;
      break;

    case BlursActionsType.FETCH_ADD_BLUR:
      draft.addFormState = AddFormState.LOADING;
      break;

    case BlursActionsType.REMOVE_BLUR:
      draft.data = draft.data.filter((obj) => obj._id !== action.payload);
      break;

    case BlursActionsType.ADD_BLUR:
      draft.data.splice(0, 0, action.payload);
      // TODO: Подумать, какой статус выбрать, если пост был добавлен
      draft.addFormState = AddFormState.NEVER;
      break;

    default:
      break;
  }
}, initialBlursState);
