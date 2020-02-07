const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

const VENDOR_LIBS = ["react", "react-dom"];

const GRAPH_LIBS = ["graphql", "graphql-tag"];

module.exports = env => {
  return {
    mode: "development",
    entry: {
      client: "./app/index.js",
      vendor: VENDOR_LIBS,
      graph: GRAPH_LIBS
      //   apollo: APOLLO_LIBS
    },
    // generating corret errormessages in browser
    devtool: "inline-source-map",
    devServer: {
      contentBase: __dirname,
      disableHostCheck: true,
      port: 8080
    },
    output: {
      filename: "[name].[chunkHash].js",
      chunkFilename: "[name].[chunkHash].js",
      path: path.resolve(__dirname, "dist")
    },
    optimization: {
      splitChunks: {
        chunks: "all"
      }
    },
    module: {
      rules: [
        {
          test: /\.css/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.(bin)$/,
          use: [
            {
              loader: "file-loader",
              options: {}
            }
          ]
        },
        {
          test: /\.(png|svg|jpg|gif|jpeg)$/,
          use: ["file-loader"]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ["file-loader"]
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: "graphql-tag/loader"
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: "Home App",
        template: "template.html"
      }),
      new CompressionPlugin({
        test: /\.js(\?.*)?$/i,
        compressionOptions: { level: 1 },
        algorithm: "gzip"
      })
    ],
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    // example of import: import Utility from 'Utilities/utility'
    resolve: {
      alias: {
        "@auth-context": path.resolve(
          __dirname,
          "app/context/authentication/consumer/authConsumer.js"
        )
      }
    }
  };
};
