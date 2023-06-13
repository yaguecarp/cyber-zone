/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    RAWG_API_KEY: process.env.RAWG_API_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY
  }
}

module.exports = nextConfig
