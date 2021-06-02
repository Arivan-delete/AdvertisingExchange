import { axios } from '../../core/axios';
import { LoginFormProps } from '../../pages/SignIn/components/LoginModal';
import { RegisterFormProps, RegisterProps } from '../../pages/SignIn/components/RegisterModal';
import {toastr} from 'react-redux-toastr'


interface ResponseApi {
  status: string;
  data: any;
  _id: string | null;
  exist?: boolean
}

interface LogData {
  emailField: string;
  passwordField: string;
}

declare const window: any;

export const apiUrl = 'http://localhost:3000'

export const AuthApi = {
  async verify(hash: string): Promise<ResponseApi> {
    const { data } = await axios.get<ResponseApi>('/auth/verify?hash=' + hash);
    return data;
  },
  async signIn(postData: any): Promise<any> {
    return await axios.post<ResponseApi>(apiUrl + '/api/login', {
      email: postData.emailField,
      password: postData.passwordField,
    }).then(r => {
      return r
    }).catch(e => {
      toastr.error('Помилка', e.response.data.message)
    });
  },
  async signUp(postData: any): Promise<ResponseApi> {
    const { data } = await axios.post<ResponseApi>(apiUrl + '/api/user', {
      email: postData.emailField,
      username: postData.nameField,
      password: postData.passwordField
    });
    return data;
  },
  async getMe(): Promise<ResponseApi> {
    const { data } = await axios.get<ResponseApi>(apiUrl + '/user'); // was '/user/me'
    return data;
  },
  async getUserInfo(userId: string): Promise<ResponseApi> {
    const { data } = await axios.get<ResponseApi>(apiUrl + '/api/user/' + userId);
    return data;
  },
};

// @ts ignore was here
window.AuthApi = AuthApi;
