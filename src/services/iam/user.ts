import { API_IAM } from '@/apiUrls/iam';
import { getAPI, postAPI } from '@/services/api';
import { LoginInputs } from './type';

export function login(data: LoginInputs) {
  return postAPI(API_IAM.USER.LOGIN, data);
}
export function getProfile() {
  return getAPI(API_IAM.USER.PROFILE);
}
