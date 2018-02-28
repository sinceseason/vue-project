// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // no-tabs
    'no-tabs': 'off',
    // 允许使用tab缩进
    'indent': 0,
    // if 后跟 {}
    'curly': 'off',
    // 禁止混用tab和空格
    "no-mixed-spaces-and-tabs": 'off',
    // 文件以单一的换行符结束
    'eol-last': 'off',
    // object properties must got on a new line
    'object-property-newline': 'off'
  }
}
