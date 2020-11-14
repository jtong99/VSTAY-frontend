const withPlugins = require('next-compose-plugins');
const optimizedImg = require('next-optimized-images');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
module.exports = withPlugins([[optimizedImg], [withBundleAnalyzer]]);
