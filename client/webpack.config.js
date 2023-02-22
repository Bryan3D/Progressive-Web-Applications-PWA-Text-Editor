const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
const workboxPlugin = new InjectManifest({
  swSrc: './src/sw.js',
  swDest: 'sw.js',
});

// TODO: Add CSS loaders and babel to webpack.
   
const cssLoader = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader'],
};

const babelLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'],
    },
  },
};

module.exports = () => {
 /*  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      database: './src/js/database.js',
      editor: './src/js/editor.js',
      header: './src/js/header.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    } */
  return {
  entry: "./src/js/main.js",
    output: {
      path: __dirname + '/dist/',
      filename: "bundle.js",
        publicPath: '/'
  },
  devServer: {
    inline: false,
      contentBase: "./dist",
    },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        title: 'JATE',
      }),
      // Inject the manifest into the HTML page.
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
        /* swSrc: './src/sw.js',
        swDest: 'sw.js', */
      }),

      // TODO: Add the WebpackPwaManifest plugin.

      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'A simple text editor',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

        module: {
            // TODO: Add babel-loader to the rules array.
            // CSS loader configuration
          //  html-loader configuration
          rules: [
            {
              test: /\.html$/,
              exclude: [/node_modules/, require.resolve('./index.html')],
              use: {
                loader: 'file-loader',
                query: {
                  name: '[name].[ext]'
                },
              },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
              test: /\.js$/,
              exclude: /node_modules/,
              // TODO: Add babel-loader to the use array.
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                  plugins: ['@babel/plugin-proposal-class-properties'],
                  // query should be moved into options
                  query: {
                    compact: false
                  },
                },
              },
            },
          ],
        },
      };
    };
