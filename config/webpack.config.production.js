/**
 * Build config for electron 'Renderer Process' file
 */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.config.base');

const extractLib = new ExtractTextPlugin('./styles/lib.css');
const extractUserGlobal = new ExtractTextPlugin('./styles/global.css');
const extractUser = new ExtractTextPlugin('./styles/style.css');

module.exports = merge(baseConfig, {
  mode: 'production',

  devtool: 'cheap-module-source-map',

  entry: [
    './app/index'
  ],

  output: {
    path: path.join(__dirname, '../app/dist'),
    publicPath: '../dist/'
  },

  module: {
    rules: [

      {
        test: /\.less$/,
        use: extractLib.extract({
          use: [{
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[local]',
              }
            },
            {
              loader: 'less-loader',
              options: {
                modifyVars: {
                  'primary-color': '#1DA57A',
                },
                javascriptEnabled: true,
              }
            }
          ],
        }),
        include: /node_modules\/antd/
      },

      // Add LESS support  - compile all .global.less files and pipe it to style.css
      {
        test: /\.global\.less$/,
        use: extractUserGlobal.extract({
          use: [{
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]__[hash:base64:5]',
              }
            },
            {
              loader: 'less-loader',
            }
          ],
        }),
        exclude: /node_modules\/antd/
      },

      // Add LESS support  - compile all other .less files and pipe it to style.css
      {
        test: /^((?!\.global).)*\.less$/,
        use: extractUser.extract({
          use: [{
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]__[hash:base64:5]',
              }
            },
            {
              loader: 'less-loader',
            }
          ],
        }),
        exclude: /node_modules\/antd/
      },

      // WOFF Font
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
          }
        },
      },
      // WOFF2 Font
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
          }
        }
      },
      // TTF Font
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/octet-stream'
          }
        }
      },
      // EOT Font
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader',
      },
      // SVG Font
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'image/svg+xml',
          }
        }
      },
      // Common Image Formats
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
        use: 'url-loader',
      }
    ]
  },

  plugins: [
    // https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
    // https://github.com/webpack/webpack/issues/864
    new webpack.optimize.OccurrenceOrderPlugin(),

    extractLib,
    extractUserGlobal,
    extractUser,

    new HtmlWebpackPlugin({
      filename: '../public/app.html',
      template: 'app/public/app.html',
      inject: false
    })
  ],

  // https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
  target: 'electron-renderer'
});
