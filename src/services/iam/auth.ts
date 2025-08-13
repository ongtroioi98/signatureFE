import { API_IAM } from '@/apiUrls/iam';
import { getAPI, postAPI } from '@/services/api';
import { LoginInputs } from './type';

export function refreshToken(data: string) {
  return postAPI(API_IAM.AUTH_API.REFRESH_TOKEN, {});
}
