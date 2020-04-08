/* eslint-disable no-undef */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");
const ManifestPlugin = require("webpack-manifest-plugin");

const baseContext = path.join(__dirname, "../src");
const PUBLIC_PATH = "/";

module.exports = {
  context: baseContext,
  entry: {
    polyfill: "../src/setup/polyfills.ts",
    main: "../src/index.tsx",
    login: "../src/components/Views/Login/Container",
    home: "../src/components/Views/Home/Container"
  },
  output: {
    path: path.resolve(__dirname, "../build"),
    filename: "[name].[hash].bundle.js",
    publicPath: PUBLIC_PATH
  },
  resolve: {
    modules: [baseContext, "node_modules"],
    extensions: [".ts", ".tsx", ".js"],
    symlinks: false,
    alias: {
      "react-dom": "@hot-loader/react-dom"
    }
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: "ts-loader"
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(woff|ttf|eot|otf|svg|png)$/,
        use: {
          loader: "file-loader"
        },
        include: [baseContext],
        exclude: /node_modules/
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },
  plugins: [
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
      PUBLIC_URL: "."
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "../public/index.html"
    }),
    // Generate a manifest file which contains a mapping of all asset filenames
    // to their corresponding output file so that tools can pick it up without
    // having to parse `index.html`.
    new ManifestPlugin({
      fileName: "manifest.json",
      publicPath: PUBLIC_PATH,
      generate: (seed, files) => {
        const manifestFiles = files.reduce(
          (manifest, file) => ({
            ...manifest,
            [file.name]: file.path
          }),
          seed
        );

        return {
          files: manifestFiles
        };
      }
    })
  ],
  target: "web"
};
