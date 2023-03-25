/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "imgs.xkcd.com"
    ]
  },
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    // localeDetection: false, // default: true
    // domains: [
    //   {
    //     domain: 'xkcd.com',
    //     defaultLocale: 'en'
    //   },
    //   {
    //     domain: 'xkcd.es',
    //     defaultLocale: 'es'
    //   }
    // ]
  }
}

module.exports = nextConfig
