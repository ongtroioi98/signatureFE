'use server';
// import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { getErrorMessage, postAPI } from '../../services/api';
import { API_IAM } from '@/apiUrls/iam';
import { cookies } from 'next/headers';
import { Errors } from '@/services/types';
import { UserServices } from '@/services/iam';
// CREATE TABLE todos (
//   id SERIAL PRIMARY KEY,
//   text TEXT NOT NULL
// );

async function login(prevState: any, formData: FormData) {
  debugger;
  const schema = zfd.formData({
    username: zfd.text(z.string().min(1, 'Trường này bắt buộc nhập')),
    password: zfd.text(z.string().min(1, 'Trường này bắt buộc nhập')),
  });
  try {
    const data = schema.parse(formData);
    const res = await UserServices.login(data);
    cookies().set('token', res?.access_token);
    cookies().set('refresh_token', res.refresh_token);
    return { message: `Added todo` };
  } catch (e: any) {
    console.log('errorr,......', e);
    return { message: getErrorMessage(e) };
  }
}
export { login };
