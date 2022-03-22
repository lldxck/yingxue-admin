module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    // "plugin:prettier/recommended",
  ],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    // 解决名称为单个字母的
    "vue/multi-word-component-names": 0,
    // 解决 error  Delete `␍`  prettier/prettier
    // 'prettier/prettier': [
    //   'error',
    //   {
    //     'endOfLine': 'auto',
    //   }
    // ],
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
};
