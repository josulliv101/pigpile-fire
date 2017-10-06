
const path = require('path');

module.exports = {
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      // 'firebase-database': path.resolve(__dirname, '../functions/firebase-database'),
    },
  },
  resolveLoader: {
    // modules: [path.resolve(__dirname, "./node_modules")],
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react', 'stage-0']
      }
    }]
  }
};
