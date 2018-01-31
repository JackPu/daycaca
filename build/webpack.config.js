const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: path.join(__dirname, '../src'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'index.js',
    library: 'daycaca',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
        }],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [],
};
