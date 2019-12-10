const { createMacro } = require('babel-plugin-macros');
const { injectGql } = require('./helpers');

exports.autoInjectGql = createMacro(({ references, state, babel }) => {
  const t = babel.types;
  references.default.forEach(path => {
    if (path.parentPath && t.isCallExpression(path.parentPath)) {
      const component = path.parentPath.get('arguments')[0].node;
      injectGql({ t }, path.parentPath.parentPath, path.parentPath, component);
    }
  });
});
