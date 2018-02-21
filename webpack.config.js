const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
const path = require('path');

const port = process.env.PORT || 3000;


module.exports = {
  
  entry: {
    vendor: ['./src/utils/env.js'],
    app: ['./src/index.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js'
  },


  module: {
    rules: [  
      // First Rule
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      // Second Rule
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
              sourceMap: true
            }
          }
        ]
      }
    ]
  },  
  plugins: [
    new CleanWebpackPlugin(['dist']),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    
    new webpack.optimize.UglifyJsPlugin(),
    
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon: 'public/favicon.ico'
    }),

    new ManifestPlugin({seed:{
      'ompa' : "loompa"
    }})    
  ],

  devServer: {
    host: 'localhost',
    port: port,
    historyApiFallback: true,
    open: true
  }  
};