const path = require("path");

const webpack = require("webpack");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const errorOverlayMiddleware = require("react-dev-utils/errorOverlayMiddleware");
const evalSourceMapMiddleware = require("react-dev-utils/evalSourceMapMiddleware");

const base = require("./webpack.config");

module.exports = {
  mode: "development",
  context: base.context,
  entry: {
    app: [
      base.entry.polyfill,
      require.resolve("react-dev-utils/webpackHotDevClient"),
      base.entry.main
    ]
  },
  output: {
    ...base.output,
    pathinfo: true,
    devtoolModuleFilenameTemplate: (info) =>
      path.resolve(info.absoluteResourcePath)
  },
  resolve: base.resolve,
  plugins: [
    ...base.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new ProgressBarPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.DefinePlugin({
      "process.env": {
        HOT: true,
        ENV: JSON.stringify("local")
      }
    })
  ],
  module: base.module,
  devtool: "cheap-module-source-map",
  externals: base.externals,
  devServer: {
    compress: true,
    hot: true,
    // create-react-app's fancy overlay is used instead
    overlay: false,
    // Silence WebpackDevServer's own logs since they're generally not useful.
    // It will still show compile warnings and errors with this setting.
    clientLogLevel: "none",
    contentBase: base.output.path,
    publicPath: base.output.publicPath,
    historyApiFallback: true,
    before(app, server) {
      // This lets us fetch source contents from webpack for the error overlay
      app.use(evalSourceMapMiddleware(server));
      // This lets us open files from the runtime error overlay.
      app.use(errorOverlayMiddleware());
    }
  }
};
