import { Errors } from '@/services/types';
import fetchWithAuth from '@/utils/fetchWithAuth';
import { getCookie } from '@/utils/hepler';
export function getErrorMessage(err: Errors) {
  if (Array.isArray(err)) {
    return err[0]?.message;
  }
  if (err.errors) {
    return err.errors[0]?.message;
  }
  return err.message;
}
export async function getAPI(url: string) {
  try {
    const res = await fetchWithAuth(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('token'),
        credentials: 'include',
      },
    });
    if (!res.ok) {
      throw await res.json();
    }
    return res.json();
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
}
export async function postAPI(url: string, data: object) {
  try {
    const res = await fetchWithAuth(url, {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'include',
    });
    if (!res.ok) {
      throw await res.json();
    }
    return res.json();
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
}
export async function putAPI(url: string, data: object) {
  try {
    const rawResponse = fetchWithAuth(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return rawResponse;
  } catch (ex) {
    console.log(ex);
  }
}
export async function deleteAPI(url: string, data: object) {
  try {
    const rawResponse = await fetchWithAuth(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return rawResponse;
  } catch (ex) {
    console.log(ex);
  }
}
