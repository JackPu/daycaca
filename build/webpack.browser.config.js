const config = require('./webpack.config.js');
const webpack = require('webpack');

config.output.filename = 'daycaca.min.js';
config.plugins = [
  new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    sourceMap: false,
    mangle: true,
    compress: {
      warnings: false,
    },
  }),
];

module.exports = config;
