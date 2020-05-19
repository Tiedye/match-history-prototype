const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: "development",
  entry: './src/index.ts',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      { test: /\.html$/, use: 'html-loader' },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
      { test: /\.ts$/, use: 'ts-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Risen Web Tools"
    }),
    new webpack.WatchIgnorePlugin([
      /\.js$/,
      /\.d\.ts$/
    ])
  ],
};