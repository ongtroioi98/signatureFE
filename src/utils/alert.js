import {getTranslations} from 'next-intl/server';
import { clearData } from './services';
import { API_IAM } from '@/apiUrls/iam';
const sessionTimeoutHandle = () => {
  clearData();
  setTimeout(() => {
    window.location = `/login?redirect=${window.location.href}`;
  }, 1000);
};
const getErrorMessage = async (error) => {
    const t = await getTranslations();
  let err = { ...error };
  if (error?.request?.responseType === 'blob') {
    const blob = error?.response?.data;
    if (blob.type === 'application/json') {
      const text = await blob.text();
      err.response.data = JSON.parse(text);
    }
  }
  if (typeof err == 'string') {
    return err;
  }
  if (err.message === 'Network Error') {
    return t('errorCode.network');
  }
  if (err.message === 'canceled') {
    return err.message;
  }
  if (err?.response?.status) {
    switch (err.response.status) {
      case 400:
        if (API_IAM.AUTH_API.REFRESH_TOKEN === err.config.url) {
          sessionTimeoutHandle();
        }
        if (Array.isArray(err?.response?.data?.errors)) {
          return err?.response?.data?.errors[0].message;
        }
        return err.response?.data?.message || t('errorCode.400');
      case 401:
        if (!API_IAM.AUTH_API.IGNORE_401_PATH.includes(err.config.url)) {
          sessionTimeoutHandle();
        }
        return err.response?.data?.message || t('errorCode.401');
      case 403:
        return err.response?.data?.message || t('errorCode.403');
      case 500:
        return err.response?.data?.message || t('errorCode.500');
      default:
        return err.response?.data?.message || err.message;
    }
  } else {
    return t('errorCode.other');
  }
};
const getErrorMessageSync = (error) => {
  let err = { ...error };
  if (typeof err == 'string') {
    return err;
  }
  if (err.message === 'Network Error') {
    return t('errorCode.network');
  }
  if (err.message === 'canceled') {
    return err.message;
  }
  if (err?.response?.status) {
    switch (err.response.status) {
      case 400:
        if (API_IAM.AUTH_API.REFRESH_TOKEN === err.config.url) {
          sessionTimeoutHandle();
        }
        if (Array.isArray(err?.response?.data?.errors)) {
          return err?.response?.data?.errors[0].message;
        }
        return err.response?.data?.message || t('errorCode.400');
      case 401:
        if (
          ![
            API_IAM.AUTH_API.LOGIN_AD,
            API_IAM.AUTH_API.LOGIN_LOCAL,
            API_IAM.AUTH_API.LOGIN_VH,
          ].includes(err.config.url)
        ) {
          sessionTimeoutHandle();
        }
        return err.response?.data?.message || t('errorCode.401');
      case 403:
        return err.response?.data?.message || t('errorCode.403');
      case 500:
        return err.response?.data?.message || t('errorCode.500');
      default:
        return err.response?.data?.message || err.message;
    }
  } else {
    return t('errorCode.other');
  }
};

export { getErrorMessage, getErrorMessageSync };
