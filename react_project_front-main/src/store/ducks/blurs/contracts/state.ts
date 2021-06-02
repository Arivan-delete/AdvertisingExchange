import { LoadingStatus } from '../../../types';
import { User } from '../../user/contracts/state';

export enum AddFormState {
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  NEVER = 'NEVER',
}

export interface Blur {
  _id: string;
  text: string;
  images?: [];
  createdAt: string;
  user: User;
}

export interface BlursState {
  data: any[];
  LoadingStatus: LoadingStatus;
  addFormState: AddFormState;
}
