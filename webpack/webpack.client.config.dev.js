const webpack = require('webpack')
const baseConfig = require('./webpack.config');
const path = require('path');

const HOST = 'localhost'
const PORT = 3001

module.exports = Object.assign({}, {
	devtool: 'inline-source-map',
	entry: [
    'babel-polyfill',
  	'react-hot-loader/patch',
  	`webpack-dev-server/client?http://${HOST}:${PORT}`,
  	'webpack/hot/only-dev-server',
  	'./src/containers/ClientApp/'
	],
  target: 'web',
  output: {
    filename: 'client.bundle.js',
    path: path.resolve(__dirname, '../public/assets'),
    publicPath: `http://${HOST}:${PORT}/assets/`
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        "BUILD_TARGET": JSON.stringify("client"),
        "NODE_ENV": JSON.stringify("development"),
      }
    })
  ],
  devServer: {
    headers: { "Access-Control-Allow-Origin": "*" },
    host: HOST,
    historyApiFallback: true,
    hot: true,
    port: PORT
  },
}, baseConfig);
