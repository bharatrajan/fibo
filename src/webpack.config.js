const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const port = process.env.PORT || 3000;


module.exports = {
  entry: '.App.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'App.bundle.js'
  }
};