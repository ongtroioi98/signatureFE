// import createIntlMiddleware from 'next-intl/middleware';
// import i18nConfig from '../i18nConfig';

// const intlMiddleware = createIntlMiddleware(i18nConfig);

// export default intlMiddleware;

// export const config = {
//   // Match only internationalized pathnames
//   matcher: ['/', '/(vi|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
// };


import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'vi'],
  localePrefix: 'never',
  // Used when no locale matches
  defaultLocale: 'en',
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(vi|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
};