## [ESLint](https://eslint.org/docs/latest/use/getting-started)

### 1) 방법 1

#### 설치

```bash
❯ npm i --save-dev eslint
```

#### eslint configuration 생성

/> ESLint: Create ESLint Configuration

```bash
node_modules/.bin/eslint --init
❯ node_modules/.bin/eslint --init
You can also run this command directly using 'npm init @eslint/config@latest'.
Need to install the following packages:
@eslint/create-config@1.1.4
Ok to proceed? (y) y
✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · javascript
✔ Where does your code run? · browser
The config that you've selected requires the following dependencies:

eslint@9.x, globals, @eslint/js
✔ Would you like to install them now? · No / Yes
✔ Which package manager do you want to use? · npm
☕️Installing...
```

### 2) 방법 2

```bash
❯ npm init @eslint/config@latest

```

```bash
❯ npm init --save-dev  @eslint/config@latest

✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · javascript
✔ Where does your code run? · browser
The config that you've selected requires the following dependencies:

eslint@9.x, globals, @eslint/js
✔ Would you like to install them now? · No / Yes
✔ Which package manager do you want to use? · npm
☕️Installing...
```

```mjs
// /eslint.config/mjs
import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: { globals: globals.browser },
    // rules: {
    //   quotes: ["error", "single"],
    //   semi: "error",
    // },
  },
  pluginJs.configs.recommended,
];
```
