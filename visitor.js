// const t = require('@babel/types');
const template = require('@babel/template');
const { injectGql } = require('./helpers');

function checkPath(options) {
  if (!this.file) return true;
  const filename = this.file.opts.filename;
  return options.include
    ? options.include.some(
        reg =>
          reg.test(filename) &&
          (options.exclude
            ? !options.exclude.some(reg => reg.test(filename))
            : true)
      )
    : true;
}

module.exports = (options, t) => ({
  // ExportNamedDeclaration(path) {
  // if (
  //   path.node.declaration &&
  //   path.node.declaration.declarations &&
  //   (path.node.declaration.declarations[0].id.name === 'qwer' ||
  //     path.node.declaration.declarations[0].id.name === 'queryLocal' ||
  //     path.node.declaration.declarations[0].id.name === 'toggleNetwork')
  // ) {
  //   console.log(path.node.declaration.declarations[0].init);
  // }
  // },
  ExportDefaultDeclaration(path) {
    if (!checkPath.call(this, options)) return;

    let component;
    switch (path.node.declaration.type) {
      case 'ClassDeclaration':
      case 'FunctionDeclaration':
      case 'ArrowFunctionExpression':
        component = t.toExpression(path.node.declaration);
        break;
      case 'Identifier':
        component = path.node.declaration;
        break;
      default:
        break;
    }
    if (!component) return;
    injectGql({ t, options }, path, path.get('declaration'), component);
  }
});
