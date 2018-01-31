const config = require('./webpack.config.js');
const webpack = require('webpack');

config.output.libraryTarget = 'umd';

module.exports = config;
