const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDevelopMode = process.env.NODE_ENV === "development";

module.exports = {
  mode: isDevelopMode ? "development" : "production",

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },

  entry: "./src/index",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          isDevelopMode ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: isDevelopMode ? "[path][name]__[local]--[hash:base64:5]" : "[hash:base64:5]",
              },
              importLoaders: 1,
              sourceMap: isDevelopMode,
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.css$/,
        use: [isDevelopMode ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|woff|woff2|ttf|svg|ico)$/i,
        use: "file-loader",
      },
    ],
  },

  devServer: {
    static: path.join(__dirname, "build"),
    port: 8088,
    open: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new CleanWebpackPlugin(),
    ...(!isDevelopMode ? [new MiniCssExtractPlugin({ filename: "[name].css" })] : []),
  ],
};
