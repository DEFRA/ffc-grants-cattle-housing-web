const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
console.log(`Running webpack in ${isDev ? 'development' : 'production'} mode`)

const urlPrefix = '/upgrading-calf-housing'

module.exports = {
  entry: './app/assets/src/index.js',
  mode: isDev ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'string-replace-loader',
          options: {
            search: '__URLPREFIX__',
            replace: urlPrefix,
            flags: 'g'
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              esModule: false
            }
          },
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
              sassOptions: {
                outputStyle: 'compressed'
              }
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'images/'
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'fonts/'
          }
        }
      }
    ]
  },
  output: {
    filename: 'js/bundle.[fullhash].js',
    path: path.resolve(__dirname, 'app/assets/dist'),
    publicPath: `${urlPrefix}/assets/`
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      filename: '.layout.njk',
      template: 'app/assets/src/layout.njk',
      metadata: {
        urlPrefix,
        surveyLink: process.env.SURVEY_LINK

      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/application.[fullhash].css'
    })
  ]
}
