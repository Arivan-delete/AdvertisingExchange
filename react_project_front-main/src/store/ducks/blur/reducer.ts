import produce, { Draft } from 'immer';
import { LoadingStatus } from '../../types';
import { BlurActions } from './actionCreators';
import { BlurActionsType } from './contracts/actionTypes';
import { BlurState } from './contracts/state';

const initialBlurState: BlurState = {
  data: undefined,
  LoadingStatus: LoadingStatus.NEVER,
};

export const blurReducer = produce((draft: Draft<BlurState>, action: BlurActions) => {
  switch (action.type) {
    case BlurActionsType.SET_BLUR_DATA:
      draft.data = action.payload;
      draft.LoadingStatus = LoadingStatus.LOADED;
      break;

    case BlurActionsType.FETCH_BLUR_DATA:
      draft.data = undefined;
      draft.LoadingStatus = LoadingStatus.LOADING;
      break;

    case BlurActionsType.SET_LOADING_STATE:
      draft.LoadingStatus = action.payload;
      break;

    default:
      break;
  }
}, initialBlurState);
