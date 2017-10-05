
const baseConfig = require('./webpack.config');
const path = require('path');

// Note that since this is for the server, it is important to
// set the target to node and set the libraryTarget to commonjs2
module.exports = Object.assign({}, {
  target: 'node',
  entry: './src/containers/ServerApp/',
  output: {
    filename: 'server.bundle.js',
    path: path.resolve(__dirname, '../functions/build'),
    libraryTarget: 'commonjs2',
  }
}, baseConfig);

