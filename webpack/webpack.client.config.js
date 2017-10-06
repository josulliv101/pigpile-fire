const webpack = require('webpack')
const baseConfig = require('./webpack.config');
const path = require('path');

module.exports = Object.assign({}, {
  entry: './src/containers/ClientApp/',
  output: {
    filename: 'client.bundle.js',
    path: path.resolve(__dirname, '../public/assets')
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
        "process.env": {
            "BUILD_TARGET": JSON.stringify("client"),
            "NODE_ENV": JSON.stringify("production"),
        }
    })
  ],
}, baseConfig);
