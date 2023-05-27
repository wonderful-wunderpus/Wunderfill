const path = require('path');
const HTMLWepackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './frontend/src/index.js',
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js'
  },
  plugins: [
    new HTMLWepackPlugin({
      template: './frontend/src/index.html'  // not sure about this guy
    })
  ],
  module: {

  }
};


//build folder goes in to chrome extension