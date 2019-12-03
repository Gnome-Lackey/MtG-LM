const webpack = require("webpack");

const base = require("./webpack.config.base");

module.exports = {
  mode: "production",
  context: base.context,
  entry: base.entry,
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: "all",
      minSize: 0,
      maxInitialRequests: Infinity,
      name: true,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace("@", "")}`;
          }
        }
      }
    }
  },
  output: base.output,
  resolve: base.resolve,
  plugins: base.plugins.concat([
    new webpack.DefinePlugin({
      "process.env": {
        ENV: JSON.stringify(process.env.ENV)
      }
    })
  ]),
  module: base.module,
  externals: base.externals
};
