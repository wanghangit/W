const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, './demo/index.js')
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    library: '[name]'
  },
  devServer: {
    port: 8000,
  },
  mode: 'development',
  devtool: "cheap-module-eval-source-map",
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './demo/index.html')
    })
  ]
};
