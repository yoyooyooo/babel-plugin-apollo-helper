// const t = require('@babel/types');
const template = require('@babel/template');

module.exports = function({ types: t }, options) {
  return {
    inherits: require('@babel/plugin-syntax-jsx').default,
    visitor: require('./visitor')(options, t)
  };
};
