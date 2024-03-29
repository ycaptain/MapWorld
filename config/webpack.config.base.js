/**
 * Base webpack config used across other specific configs
 */

const path = require('path');
const {
  dependencies: externals
} = require('../app/package.json');
const tsImportPluginFactory = require('ts-import-plugin')


module.exports = {
  module: {
    rules: [{
      test: /\.ts(x)?$/,
      loaders: [{
        loader: 'react-hot-loader/webpack'
      },
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [ tsImportPluginFactory({
              libraryName: 'antd',
              libraryDirectory: 'es',
              style: true
              }
            )]
          })
        },
      }
    ],
      exclude: /node_modules/,
    }]
  },

  output: {
    path: path.join(__dirname, 'app'),
    filename: 'bundle.js',

    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  // https://webpack.github.io/docs/configuration.html#resolve
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
    modules: [
      path.join(__dirname, 'app'),
      'node_modules',
    ],
    alias: {
      '@': path.join(__dirname, '../app')
    }
  },

  plugins: [],

  externals: Object.keys(externals || {})
};
