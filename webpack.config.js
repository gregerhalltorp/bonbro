const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const isDevMode = !process.env.IS_BUILD_MODE;

const plugins = [
  new CleanWebpackPlugin(['build']),
  new HtmlWebpackPlugin({
    inject: true,
    filename: 'index.html',
    template: path.resolve(__dirname, 'public', 'index.html'),
  }),
];

if (isDevMode) {
  plugins.concat([new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin()]);
}

module.exports = {
  entry: ['babel-polyfill', 'whatwg-fetch', './src/index.js'],
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react', 'stage-2'],
          plugins: ['react-hot-loader/babel'],
          babelrc: false,
        },
      },
    ],
  },
  plugins: plugins,
};
