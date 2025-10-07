const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const templates = require('./templates')
// const SqipWebpackPlugin = require('./sqip-webpack-plugin')

module.exports = {
  target: 'web',
  entry: {
    // Service worker entry point:
    serviceWorker: path.resolve(__dirname, '../src/serviceWorker.js'),
    // Application entry point:
    index: path.resolve(__dirname, '../src/scripts/index.ts'),
    // synth: path.resolve(__dirname, '../src/scripts/dd.ts'),
    synth: path.resolve(__dirname, '../src/scripts/synth.js'),
    ded: path.resolve(__dirname, '../src/scripts/ded.js'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: (pathData) => {
      if (pathData.chunk.name === 'serviceWorker') {
        // return 'serviceWorker.js'
        return '[name].js'
      }

      return '[name].[contenthash:8].bundle.js';
    },
    publicPath: '/'
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
  },
  resolve: {
    // extensions: ['.ts', '.js'],
    extensions: ['.ts', '.js', '.html'],
    alias: {
      'media': path.resolve(__dirname, '../src/media/'),
    }
  },
  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        options: {
          // url dosn't start with https
          inlineRequires: /^(?!https).*\.(png|svg|jpe?g|webp|gif|ico)$/i,
          rootRelative: path.join(__dirname, '../src/templates/hbs/'),
          precompileOptions: {
            knownHelpersOnly: false
          },
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                  ],
                ],
              },
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.woff2|otf$/i,
        use: 'url-loader',
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, '../manifest.json'),
            to: 'manifest.json'
          },
          // {
          //   from: path.resolve(__dirname, '../src/synth/synth.html'),
          //   to: 'synth/index.html' // this will make this page available at synth/
          // },
          {
            from: path.resolve(__dirname, '../src/offline.html'),
            to: 'offline.html'
          },
          {
            from: path.resolve(__dirname, '../src/media/icons/'),
            to: 'icons/'
          },
          {
            from: path.resolve(__dirname, '../src/media/audio'),
            to: 'audio/'
          },
          {
            from: path.resolve(__dirname, '../src/media/images/video-thumbnails'),
            to: 'video-thumbnails/'
          }
        ]
      }
    ),
    ...templates.map(template => new HtmlWebpackPlugin(template)),
    // new SqipWebpackPlugin({
    //   // projectRoot: path.resolve(__dirname, '../'),
    //   // mediaRoot: path.resolve(__dirname, '../src/media/')
    //   // mediaRoot: path.resolve(__dirname, '../src/media/')
    // }),
  ]
}