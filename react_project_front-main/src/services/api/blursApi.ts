import { axios } from '../../core/axios';
import { Blur } from '../../store/ducks/blurs/contracts/state';
import { apiUrl } from './authApi'
import {toastr} from 'react-redux-toastr'

  interface Response<T> {
    status: string;
    data: T;
  }
  export const BlursApi = {
      async fetchBlurs(): Promise<Blur[]> {
        return axios.get(apiUrl + '/api/blurs').then(({ data }) =>  {
          return data
        });
  },

  // export const BlursApi = {
  //   async fetchBlurs(userId?: string): Promise<Blur[]> {
  //     const { data } = await axios.get<Response<Blur[]>>(
  //       userId ? `/blurs/user/${userId}` : '/blurs',
  //     );
  //     return data.data;
  //   },
  // export const BlursApi = {
  //   async fetchBlurs(userId?: string): Promise<Blur[]> {
  //     const try_data =  axios.get('https://trycode.pw/c/RI7VR.json');
  //     try_data.then(({ data }) => data);
  //     const { data } = await axios.get<Response<Blur[]>>(
  //             userId ? `/blurs/user/${userId}` : '/blurs',
  //           );
  //     return data.data;
  //   },

  async fetchBlurData(id: string): Promise<Blur> {
    const { data } = await axios.get<Response<Blur>>(apiUrl + '/api/blurs/' + id);
    return data.data;
  },

  //for without DB
  // async fetchBlurData(id: string): Promise<Blur[]> {
  //   return axios.get('/blurs?_id=' + id).then(({ data }) => data);
  // },

  async addBlur(payload: { text: string; images: string[] }): Promise<Blur> {
    const { data } = await axios.post<Response<Blur>>(apiUrl + '/api/blurs', payload, {
      headers: {
        // 'Accept': 'application/json',
        // 'Content-Type': 'multipart/form-data',
      }
    });
    if(data) {
      toastr.success('Успішно', 'Допіс створено')
    }
    return data.data;
  },
  removeBlur: (id: string): Promise<void> => axios.delete(apiUrl + '/api/blurs/' + id),
};
