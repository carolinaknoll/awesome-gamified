const path = require("path");
const webpack = require("webpack");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: "./src/index.js",
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "/",
    hotOnly: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
});