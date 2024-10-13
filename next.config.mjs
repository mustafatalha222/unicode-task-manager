import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  // local dev issue with dnd package
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default withNextIntl(nextConfig)
