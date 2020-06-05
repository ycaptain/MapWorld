const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseConfig = require("./webpack.config.base");
const CopyPlugin = require("copy-webpack-plugin");

const extractLib = new ExtractTextPlugin("./styles/lib.css");
const extractUserGlobal = new ExtractTextPlugin("./styles/global.css");
const extractUser = new ExtractTextPlugin("./styles/style.css");

// FIXME: img load
module.exports = merge(baseConfig, {
  mode: "production",

  devtool: "cheap-module-source-map",

  entry: ["./app/index"],

  output: {
    path: path.join(__dirname, "../app/dist"),
    publicPath: "/",
  },

  module: {
    rules: [

      // Add LESS support  - compile all .global.less files and pipe it to style.css
      {
        test: /\.global\.less$/,
        use: extractUserGlobal.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: "[local]",
              },
            },
            {
              loader: "less-loader",
            },
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: [require("tailwindcss"), require("autoprefixer")],
              },
            },
          ],
        }),
        exclude: /node_modules\/antd/,
      },

      {
        test: /^((?!\.global).)*\.less$/,
        use: extractLib.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: "[local]",
              },
            },
            {
              loader: "less-loader",
              options: {
                modifyVars: {
                  "primary-color": "#1DA57A",
                },
                javascriptEnabled: true,
              },
            },
          ],
        }),
        include: /node_modules\/antd/,
      },

      // Add LESS support  - compile all other .less files and pipe it to style.css
      {
        test: /^((?!\.global).)*\.less$/,
        use: extractUser.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: "[name]__[local]__[hash:base64:5]",
              },
            },
            {
              loader: "less-loader",
            },
          ],
        }),
        exclude: /node_modules\/antd/,
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: '@svgr/webpack',
          },
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
        use: {
          loader: "file-loader",
        },
      },
    ],
  },

  plugins: [
    // https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
    // https://github.com/webpack/webpack/issues/864
    new webpack.optimize.OccurrenceOrderPlugin(),

    extractLib,
    extractUserGlobal,
    extractUser,

    new HtmlWebpackPlugin({
      filename: "../public/app.html",
      template: "app/public/app.html",
      inject: false,
    }),

    new CopyPlugin([{ from: "./app/electron/preload", to: "./preload"}]),

  ],

  // https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
  target: "electron-renderer",
});
