const pluginTester = require('babel-plugin-tester');
const path = require('path');

pluginTester.default({
  pluginName: 'apollo-helper',
  plugin: require('..'),
  fixtures: path.join(__dirname, '__fixtures__')
});
