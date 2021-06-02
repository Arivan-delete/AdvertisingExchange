import axios from 'axios';
import { TagsState } from '../../store/ducks/tags/contracts/state';

import { apiUrl } from './authApi'

export const TagsApi = {
  fetchTags(): Promise<TagsState['items']> {
    return axios.get(apiUrl + '/api/tags').then(({ data }) => data);
  },
};
