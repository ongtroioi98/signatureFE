'use client';
import useThemeStore from '@/store/theme';
import { Switch } from 'antd';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { THEMES } from '.';
export default function DarkModeSwitch() {
  const [cookies, setCookie] = useCookies(['theme']);
  const { toggleTheme, theme } = useThemeStore();
  return (
    <>
      <Switch
        size="small"
        checked={theme === THEMES.dark}
        onChange={(e) => {
          const t = e ? THEMES.dark : THEMES.light;
          setCookie('theme', t, {
            path: '/',
          });
          toggleTheme(t);
        }}
      ></Switch>
    </>
  );
}
