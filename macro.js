const { createMacro } = require('babel-plugin-macros');
const { injectGql } = require('./helpers');

module.exports = createMacro(({ references, state, babel }) => {
  const t = babel.types;
  references.autoInjectGql &&
    references.autoInjectGql.forEach(path => {
      if (path.parentPath && t.isCallExpression(path.parentPath)) {
        const component = path.parentPath.get('arguments')[0].node;

        injectGql({ t }, path.getStatementParent(), path.parentPath, component);
      }
    });
});
