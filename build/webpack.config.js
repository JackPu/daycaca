const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.resolve(__dirname, '../src'),
  entry: '../src',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'index.js',
    libraryTarget: 'umd',
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
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: false,
      mangle: true,
      compress: {
        warnings: false,
      },
    }),
  ],
};
