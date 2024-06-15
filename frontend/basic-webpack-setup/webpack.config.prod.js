const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/app.js",
  output: {
    filename: "[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/", // publicPath를 루트로 설정하여 파일 경로 문제를 해결
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  devtool: "source-map",
  plugins: [
    new CleanPlugin.CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      // index.html 템플릿을 기반으로 빌드 결과물을 추가해줌
      template: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "styles/[name].css",
    }),
  ],
};
