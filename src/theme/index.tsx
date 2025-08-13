import { theme as AntdTheme } from 'antd';
import darkToken from '@/theme/dark/token';
import lightToken from '@/theme/light/token';
export async function getThemeAsync(themeName: string) {
  const tokens = await import(`src/theme/${themeName}/token.json`).then(
    (module) => module.default,
  );
  return tokens;
}
export function getTheme(themeName: string) {
  switch (themeName) {
    case THEMES.dark:
      return darkToken;
    case THEMES.light:
      return lightToken;
    default:
      return darkToken;
  }
}
export const THEMES = {
  dark: 'dark',
  light: 'light',
};
