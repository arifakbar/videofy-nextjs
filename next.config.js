/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.node$/,
      use: "node-loader",
    });
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
    });
    return config;
  },
  images: {
    domains: [
      "img.freepik.com",
      "utfs.io",
      "gumlet.assettype.com",
      "www.shutterstock.com",
      "picsum.photos",
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
    ],
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
