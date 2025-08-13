'use client';
import { Segmented } from 'antd';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { cookieName } from '@/messages/setting';
import { useEffect, useState } from 'react';
export default function LocaleSwitch() {
  const [cookies, setCookie] = useCookies([cookieName]);
  const [locale, setLocale] = useState('en');
  useEffect(() => {
    const lang = cookies[cookieName];
    if (lang) setLocale(lang);
  }, [cookies]);

  const router = useRouter();
  return (
    <Segmented
      size="small"
      value={locale}
      options={[
        { label: 'VN', value: 'vi' },
        { label: 'EN', value: 'en' },
      ]}
      onChange={(value) => {
        console.log('change...........');
        const pathname = window.location.pathname;
        setCookie(cookieName, value, { path: '/' });
        let newPath = '';
        if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
          newPath = pathname.replace(`/${locale}`, `/${value}`);
        } else {
          newPath = `/${value}${pathname}`;
        }
        window.location.href =
          window.location.origin +
          (newPath.endsWith('/') ? newPath.slice(0, -1) : newPath);
        // router.push(newPath.endsWith('/') ? newPath.slice(0, -1) : newPath);
      }}
    />
  );
}
