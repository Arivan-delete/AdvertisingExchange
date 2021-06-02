import { Action } from 'redux';
import { User } from '../user/contracts/state';

export enum UsersActionsType {
  SET_ITEMS = 'users/SET_ITEMS',
  FETCH_ITEMS = 'tags/FETCH_TAGS',
  FETCH_TOP_USERS = 'users/FETCH_TOP_USERS'
}

export interface SetUsersItemsActionInterface extends Action<UsersActionsType> {
  type: UsersActionsType.SET_ITEMS;
  payload: User[];
}

export interface FetchUsersItemsActionInterface extends Action<UsersActionsType> {
  type: UsersActionsType.FETCH_ITEMS;
}

export const setUsers = (payload: User[]): SetUsersItemsActionInterface => ({
  type: UsersActionsType.SET_ITEMS,
  payload,
});

export const fetchTopUsers = (payload: any[]) => ({
  type: UsersActionsType.FETCH_TOP_USERS,
  payload
});

export type UsersActions =
  | SetUsersItemsActionInterface
  | FetchUsersItemsActionInterface;
