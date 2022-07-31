const {merge} = require('webpack-merge')
const common = require('./webpack.common.js')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const path = require('path')

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(png|svg|jpe?g|gif|ico)$/,
        use: [
          {
            loader: 'file-loader', // Or `url-loader` or your other loader
            options: {
              esModule: false,
              outputPath: 'images',
              name: '[name].[ext]',
            }
          },
          {
            loader: ImageMinimizerPlugin.loader,
            options: {
              severityError: 'warning', // Ignore errors on corrupted images
              minimizerOptions: {
                plugins: [
                  'imagemin-svgo',
                  'imagemin-webp',
                  'imagemin-gifsicle',
                  ['imagemin-mozjpeg', {quality: 80}],
                  ['imagemin-pngquant', {quality: [0.75, 0.85]}]
                ],
              },
            },
          },
        ],
      },
    ]
  },
})