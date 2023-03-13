const Path = require('path');
const Webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  devServer: {
    inline: true,
    host: '0.0.0.0',
    open: 'chrome',
    historyApiFallback: true,
  },
  plugins: [
    new Webpack.DefinePlugin({
      'KEY':JSON.stringify('DATA_PERSISTANT_KEY'), // redux data will be persisted in the local storage under this key
      'process.env.NODE_ENV': JSON.stringify('development'),
      'BASE_URL': JSON.stringify('https://swapi.dev/api/'), //this will be dev server url
      'VERSION': JSON.stringify(require("../package.json").version)
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        include: Path.resolve(__dirname, '../src'),
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        }
      },
      {
        test: /\.s?css$/i,
        use: ['style-loader', 'css-loader?sourceMap=true', 'sass-loader']
      },
      {
        test: /\.(js)$/,
        include: Path.resolve(__dirname, '../src'),
        loader: 'babel-loader'
      }
    ]
  }
});
