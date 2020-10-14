const withPlugins = require('next-compose-plugins');
const optimizedImg = require('next-optimized-images');

module.exports = withPlugins([[optimizedImg]]);
