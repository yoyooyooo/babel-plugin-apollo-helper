const babel = require('@babel/core');
const generator = require('@babel/generator');
const traverse = require('@babel/traverse');
const { parse } = require('@babel/parser');
const visitor = require('./visitor');

module.exports = function(source) {
  /pages\/user\/index\.tsx/.test(this.resourcePath) && console.log(source);
  const ast = babel.transform(source, {
    sourceType: 'module',
    presets: [
      // '@babel/preset-env',
      // '@babel/preset-typescript',
      '@babel/preset-react'
    ]
    // plugins: ['@babel/plugin-syntax-jsx', '@babel/plugin-transform-typescript']
  });
  // traverse.default(ast, visitor);
  // return generator.default(ast, {}).code;
  return ast.code;
};
