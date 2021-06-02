import { combineReducers } from 'redux';
import { blursReducer } from './ducks/blurs/reducer';
import { tagsReducer } from './ducks/tags/reducer';
import { blurReducer } from './ducks/blur/reducer';
import { userReducer } from './ducks/user/reducer';
import { usersReducer } from './ducks/users/reducer';
import { reducerAlert } from './ducks/alert/reducer';
import {reducer as toastrReducer} from 'react-redux-toastr'

export const rootReducer = combineReducers({
  blurs: blursReducer,
  blur: blurReducer,
  tags: tagsReducer,
  user: userReducer,
  users: usersReducer,
  alert: reducerAlert,
  toastr: toastrReducer // <- Mounted at toastr.
});
