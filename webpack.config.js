const path = require('path');
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

let filename;
let plugins = [];
let mode;

if (process.env.NODE_ENV === "production") {
  mode = "production";
  filename = "network-informations.min.js";
  plugins.push(new UglifyJSPlugin({ sourceMap: true }));
} else {
  mode = "development";
  filename = "network-informations.js";
}

module.exports = {
  entry: path.resolve(__dirname, "src/network-informations.js"),
  devtool: "source-map",
  target: "web",
  node: {
    fs: "empty"
  },
  mode: mode,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: filename,
    library: "networkInformations"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /src/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  plugins: plugins
}
