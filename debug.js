const path = require('path');
const babel = require('@babel/core');
const generator = require('@babel/generator');
const traverse = require('@babel/traverse');
const { parse } = require('@babel/parser');
const template = require('@babel/template');
const t = require('@babel/types');

// const App = props => {
//   return (
//     <div>
//       <span>1</span>
//     </div>
//   )
// }
const code = `
import { graphql } from '@apollo/react-hoc';

 class App extends Component {
  render() {
    return (
      <div>
        <span>1</span>
      </div>
    );
  }
}
export default App
export const query = [gql\`
  query {
    a {
      b
    }
  }
\`,{name:'wqe'}];
`;

const ast = babel.parse(code, {
  sourceType: 'module',
  plugins: ['@babel/plugin-syntax-jsx']
});
traverse.default(ast, require('./visitor')({}, t));
const output = generator.default(ast, {}, code);

console.log('\noutput========>\n', output.code);
