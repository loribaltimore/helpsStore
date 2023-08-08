/** @type {import('next').NextConfig} */
// next.config.js
const nextConfig = {};
module.exports = nextConfig;
// module.exports = {
//   async headers() {
//     return [
//         {
//           source: '/(.*)',
//           headers: [
//             {
//               key: 'Content-Security-Policy',
//               value:
//                 "default-src 'self' https://checkout.stripe.com; font-src 'self' https://fonts.googleapis.com; img-src 'self' https://images.unsplash.com https://tailwindui.com *.somewhere.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.stripe.com",
//             },
//             {
//               key: 'X-Frame-Options',
//               value: 'DENY',
//             },
//             {
//               key: 'X-Content-Type-Options',
//               value: 'nosniff',
//             },
//             {
//               key: 'Referrer-Policy',
//               value: 'origin-when-cross-origin',
//             },
//             // {
//             //   key: 'Permissions-Policy',
//             //   value: "camera=(); battery=(self); geolocation=(); microphone=('https://somewhere.com')",
//             // },
//           ],
//         },
//       ];
//   },
// };

