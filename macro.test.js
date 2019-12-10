const pluginTester = require('babel-plugin-tester');
const path = require('path');
const plugin = require('babel-plugin-macros');

pluginTester.default({
  pluginName: 'apollo-helper',
  plugin,
  snapshot: true,
  babelOptions: { filename: __filename, parserOpts: { plugins: ['jsx'] } },
  tests: {
    '1 query': `
      import autoInjectGql from "./macro";
      import { graphql } from '@apollo/react-hoc';
      import compose from 'lodash/flowRight';

      const App = props => {
        return (
          <div>
            <span>1</span>
          </div>
        );
      };

      export const query = gql\`
        query queryDemo {
          a {
            b
          }
        }
      \`;
      export default autoInjectGql(App);
    `,
    '2 query': `
      import autoInjectGql from "./macro";
      import { graphql } from '@apollo/react-hoc';
      import compose from 'lodash/flowRight';

      const App = props => {
        return (
          <div>
            <span>1</span>
          </div>
        );
      };

      export const query1 = gql\`
        query queryDemo1 {
          a {
            b
          }
        }
      \`;
      export const query2 = gql\`
        query queryDemo2 {
          c {
            d
          }
        }
      \`;
      export default autoInjectGql(App);
    `
  }
});
