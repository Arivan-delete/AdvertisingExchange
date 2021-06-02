import axios from 'axios';
import { API_URL } from '../config'

interface UploadImageReturnProps {
  height: number;
  size: number;
  url: string;
  width: number;
}

export const uploadImage = async (image: File, user: any): Promise<any> => {

  const formData = new FormData();
  formData.append('image', image);
  formData.append('user', user.user._id);

  const { data } = await axios.post(API_URL + '/api/upload', formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data

};
