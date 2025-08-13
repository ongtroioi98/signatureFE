'use client';
import { useEffect } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { UserServices } from '@/services/iam';
import { useUserStore } from '@/store/user';
export default function StartUpChecker() {
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const router = useRouter();
  useEffect(() => {
    UserServices.getProfile()
      .then((res) => {
        console.log('res dataa..............', res);
        setUserInfo(res);
      })
      .catch(() => {
          router.push('/login');
      });
  }, []);
  return null;
}
