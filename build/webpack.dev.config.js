const config = require('./webpack.config.js');
const path = require('path');

config.devServer = {
  port: 9000,
  contentBase: path.join(__dirname, '../examples'),
};
module.exports = config;
