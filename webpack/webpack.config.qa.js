const webpack = require("webpack");

const base = require("./webpack.config.base");

module.exports = {
  mode: "development",
  context: base.context,
  entry: base.entry,
  output: base.output,
  resolve: base.resolve,
  plugins: [
    ...base.plugins,
    new webpack.DefinePlugin({
      "process.env": {
        ENV: JSON.stringify("qa")
      }
    })
  ],
  module: base.module,
  devtool: "cheap-module-source-map",
  externals: base.externals
};
