const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/app.js",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/", // publicPath를 루트로 설정하여 파일 경로 문제를 해결
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["css-loader"],
      },
    ],
  },
  devtool: "eval-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"), // Webpack Dev Server가 정적 파일을 제공할 디렉토리를 지정
    },
    port: 8080,
  },
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
