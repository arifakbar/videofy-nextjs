/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
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
    ],
  },
};

module.exports = nextConfig;
