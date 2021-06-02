import { axios } from '../../core/axios';
import { API_URL } from '../../config'

interface ResponseApi {
  status: string;
  data: any;
  _id: string | null;
  exist?: boolean
}

declare const window: any;

export const usersApi = {
  async getTopusers(): Promise<ResponseApi> {
    const { data } = await axios.get<ResponseApi>(API_URL + '/api/user/top');
    return data
  }
};

// @ts ignore was here
window.usersApi = usersApi;
