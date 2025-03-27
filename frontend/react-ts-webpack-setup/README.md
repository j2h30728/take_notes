# [React / TS / SCSS] webpack 설정하기 - boilerplate

- React
- Typescript
- SCSS

## 1. 프로젝트 디렉토리 설정

```sh

mkdir my-react-ts-app
cd my-react-ts-app
mkdir src public
touch src/index.tsx src/App.tsx public/index.html

```

## 2. 프로젝트 초기화 및 패키지 설치

프로젝트를 초기화하고 필요한 패키지를 설치

```sh
npm init -y
npm install react react-dom
npm install -D typescript ts-loader @types/react @types/react-dom
npm install -D webpack webpack-cli webpack-dev-server html-webpack-plugin clean-webpack-plugin babel-loader @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript style-loader css-loader sass-loader sass file-loader mini-css-extract-plugin babel-plugin-module-resolver
```

### 프로젝트 초기화

- `npm init -y`: 프로젝트를 초기화하고 기본 설정이 포함된 package.json 파일을 생성

### React 및 React DOM 설치

- `react`: UI 컴포넌트를 생성하는 데 사용
- `react-dom`: React 컴포넌트를 브라우저의 DOM에 렌더링하는 데 사용

#### TypeScript 및 관련 패키지 설치

- `typescript`: TypeScript 컴파일러
- `ts-loader`: TypeScript를 Webpack에서 사용하기 위한 로더
- `@types/react`: React용 TypeScript 타입 정의 파일
- `@types/react-dom`: React DOM용 TypeScript 타입 정의 파일

#### Webpack 및 관련 패키지 설치

##### Webpack 및 관련 도구

- `webpack`: 모듈 번들러. 여러 파일을 하나의 번들로 묶어줌
- `webpack-cli`: 커맨드라인에서 Webpack을 실행하기 위함
- `webpack-dev-server`: 개발 서버를 제공. 실시간 리로드 기능을 통해 개발 중 빠른 피드백을 받을 수 있다.

##### Webpack 플러그인

- `html-webpack-plugin`: HTML 파일을 생성하고, 번들링된 JavaScript 파일을 자동으로 포함시켜주는 플러그인
- `clean-webpack-plugin`: 빌드 이전에 output 디렉토리를 정리해주는 플러그인
- `mini-css-extract-plugin`: CSS 파일을 별도의 파일로 추출해주는 플러그인. style-loader 대신 프로덕션 환경에서 사용됨

##### Babel 및 관련 도구

- `babel-loader`: Webpack에서 Babel을 사용하기 위한 로더
- `@babel/core`: Babel의 핵심 패키지
- `@babel/preset-env`: 최신 JavaScript 문법을 ES5로 변환해주는 Babel 프리셋
- `@babel/preset-react`: React 코드를 변환해주는 Babel 프리셋
- `@babel/preset-typescript`: TypeScript 코드를 변환해주는 Babel 프리셋

##### CSS 및 Sass 관련 도구

- `style-loader`: CSS를 JavaScript 코드로 변환하고, 이를 `<style>` 태그로 삽입. 개발 환경에서 주로 사용됨
- `css-loader`: CSS 파일을 JavaScript 모듈로 변환
- `sass-loader`: Sass/SCSS 파일을 CSS로 변환
- `sass`: Sass/SCSS 컴파일러. sass-loader가 사용

##### 파일 로더

- `file-loader`: 파일을 번들링 과정에서 처리하여, 해당 파일을 URL로 참조할 수 있게 함. 이미지, 폰트 등을 처리하는 데 사용

##### Babel 플러그인

- `babel-plugin-module-resolver`: Babel에서 모듈 경로를 간단하게 사용할 수 있게 해주는 플러그인. 경로 별칭을 설정하는 데 사용.
  - 경로를 webpack에서 설정하지않고 플러그인을 사용하여 바벨에서 설정

## 3. TypeScript 설정

tsconfig.json 파일을 생성하고 TypeScript 설정을 추가

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["dom", "es6"],
    "jsx": "react-jsx",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,

    "baseUrl": "./src",
    "paths": {
      "#/*": ["*"]
    }
  },
  "include": ["src"]
}
```

## 4. Babel 설정

babel.config.js 파일을 생성하고 Babel 설정을 추가

```js
module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          "#": "./src",
        },
      },
    ],
  ],
};
```

## 5. Webpack 설정

webpack.config.js 파일을 생성하고 Webpack 설정을 추가

```js
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
```

## 6. 프로젝트 파일 작성

public/index.html 파일을 작성

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React TypeScript App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

src/index.tsx 파일을 작성

```tsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles.scss";

ReactDOM.render(<App />, document.getElementById("root"));
```

src/App.tsx 파일을 작성

```tsx

import React from 'react';

const App: React.FC = () => {
return <h1>Hello, React with TypeScript and Webpack!</h1>;
};

export default App;
src/styles.scss 파일을 작성
```

```scss
$primary-color: #3498db;

body {
  font-family: Arial, sans-serif;
  background-color: $primary-color;
}

h1 {
  color: white;
}
```

## 7. npm 스크립트 추가

package.json 파일에 스크립트를 추가

```json
{
  //생략
  "scripts": {
    "start": "webpack serve --mode development --open",
    "build": "webpack --mode production",
    "dev": "webpack serve --mode development --open"
  }
  // 생략
}
```
