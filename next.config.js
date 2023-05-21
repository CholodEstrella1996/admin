/** @type {import('next').NextConfig} */

// Packages Transpilation
const packageJSON = require('./package.json')
const dependencyNames = Object.keys(packageJSON.dependencies)
const transpiledPackages = dependencyNames.filter((dependencyName) =>
  dependencyName.includes('@folcode/'),
)
const withTM = require('next-transpile-modules')(transpiledPackages)

// Exports Next.js configuration
const config = {
  images: {
    domains: [
      's3-cloudlabas-dev.s3.amazonaws.com',
      's3-cloudlabas-dev.s3.us-east-1.amazonaws.com',
      'www.gstatic.com',
    ],
  },
  reactStrictMode: false,
}

const nextConfig = withTM(config)

module.exports = nextConfig
