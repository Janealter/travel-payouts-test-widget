const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const enI18n = require('./src/i18n/en.json');
const ruI18n = require('./src/i18n/ru.json');

const translations = [
  { lang: 'en', t: enI18n },
  { lang: 'ru', t: ruI18n },
];

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/index.ts',
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [
      {
        test: /.ts$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    ...createTranslatedHTMLs(translations),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: '[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    minimize: true,
    minimizer: [
      '...',
      new CssMinimizerPlugin(),
    ],
  },
};

function createTranslatedHTMLs (translations) {
  return translations.map(({ lang, t }) => new HtmlWebpackPlugin({
    filename: `${lang}/index.html`,
    template: './src/index.html',
    templateParameters: { lang, t },
  }),);
}
