const {merge} = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    watchContentBase: true,
    host: '0.0.0.0', // uncomment if you want to get access from local network
    port: 8999,
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpe?g|gif|ico|webp)$/,
        loader: 'file-loader',
        options: {
          esModule: false,
          outputPath: 'images',
          name: '[name].[ext]',
        }
      },
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin()
  ]
})