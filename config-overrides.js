const path = require('path');

module.exports = function override(config) {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@context': path.resolve(__dirname, 'src/context'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@components/Layout': path.resolve(__dirname, 'src/components/Layout'),
    '@components/Tasks': path.resolve(__dirname, 'src/components/Tasks'),
    '@components/Common': path.resolve(__dirname, 'src/components/Common'),
    '@components/Chat': path.resolve(__dirname, 'src/components/Chat'),
    '@services': path.resolve(__dirname, 'src/services'),
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@styles': path.resolve(__dirname, 'src/styles'),
  };
  return config;
};
