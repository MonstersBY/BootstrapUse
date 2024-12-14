'use strict'

const path = require('path')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: "[name][contenthash].js",
    assetModuleFilename: "assets/images",
  },
  devServer: {
    static: path.resolve(__dirname, 'src'),
    port: 8080,
    open: true,
    watchFiles: path.join(__dirname, "src"),
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new CopyPlugin({
      patterns: [
        { from: "src/assets", to: "assets" },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
            postcssOptions: {
                plugins: [
                autoprefixer
                ]
            }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                silenceDeprecations: ['mixed-decls', 'color-functions', 'global-builtin', 'import'],
              }
            }
          }
        ]
      },
      {
        test: /\.(mov|mp4|jpe?g|png|webp|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
            },
          },
        ],
      },
    ]
  }
}