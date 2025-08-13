/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            // Add any svgr options here
          },
        },
      ],
    });
    return config;
  },
  compiler: {
    styledComponents: true,
    // eslint: {
    //   ignoreDuringBuilds: true,
    // },
  },
  typescript: {
    ignoreBuildErrors: true, // <-- đặt ở đây, không phải tsconfig.json
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "standalone",
  transpilePackages: [
    "@ant-design/icons-svg",
    "rc-util",
    "rc-motion",
    "rc-picker",
    "rc-dialog",
    "rc-select",
    "rc-tree", // nếu bạn dùng tree components
    "rc-collapse", // nếu dùng Collapse
    "rc-pagination",
  ],
};

module.exports = withNextIntl(nextConfig);

// /** @type {import('next').NextConfig} */
// const createNextIntlPlugin = require('next-intl/plugin');
// const i18nConfig = require('./i18nConfig');
// console.log('✅ Loaded createNextIntlPlugin =', typeof createNextIntlPlugin);
// const withNextIntl = createNextIntlPlugin(i18nConfig);

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   webpack(config) {
//     config.module.rules.push({
//       test: /\.svg$/,
//       use: [
//         {
//           loader: '@svgr/webpack',
//           options: {
//             // Add any svgr options here
//           },
//         },
//       ],
//     });
//     return config;
//   },
//   compiler: {
//     styledComponents: true,
//     // eslint: {
//     //   ignoreDuringBuilds: true,
//     // },
//   },
//   transpilePackages: ['@ant-design/icons-svg',
//     'rc-util',
//     'rc-motion',
//     'rc-picker',
//     'rc-dialog',
//     'rc-select',
//     'rc-tree', // nếu bạn dùng tree components
//     'rc-collapse', // nếu dùng Collapse
//     'rc-pagination'
//   ]
// };

// module.exports = withNextIntl(nextConfig);
