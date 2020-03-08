const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require("fs");

const dirname = path.resolve(__dirname, "./demo/pages");

const fileNames = fs.readdirSync(dirname, "utf-8");
const entrys = {};
const pages = []
fileNames.forEach(file => {
  const item = file.replace(".js", "")
  entrys[item] = path.join(dirname, "/" + file);
  pages.push(
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./demo/index.html"),
      filename: item+'.html',
      chunks: [item]
    })
  )
});

console.log(pages)
module.exports = {
  entry: entrys,
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
  plugins: pages
};
