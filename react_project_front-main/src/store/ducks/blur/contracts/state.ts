import { LoadingStatus } from '../../../types';
import { Blur } from '../../blurs/contracts/state';

export interface BlurState {
  data?: Blur;
  LoadingStatus: LoadingStatus;
}
