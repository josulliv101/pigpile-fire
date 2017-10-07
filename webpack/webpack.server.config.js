const webpack = require('webpack');
const baseConfig = require('./webpack.config');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const path = require('path');

// Note that since this is for the server, it is important to
// set the target to node and set the libraryTarget to commonjs2
module.exports = Object.assign({}, {
  target: 'node',
  entry: ['babel-polyfill', './src/containers/ServerApp/'],
  output: {
    filename: 'server.bundle.js',
    path: path.resolve(__dirname, '../functions/build'),
    libraryTarget: 'commonjs2',
  },
  plugins: [
  	// new webpack.optimize.DedupePlugin(),
  	// new webpack.optimize.AggressiveMergingPlugin(),
  	// new webpack.optimize.ModuleConcatenationPlugin(),
  	new MinifyPlugin({

  	}),
    new webpack.DefinePlugin({
        "process.env": {
            "BUILD_TARGET": JSON.stringify("node"),
            "NODE_ENV": JSON.stringify("production"),
        }
    })
  ],
}, baseConfig);

