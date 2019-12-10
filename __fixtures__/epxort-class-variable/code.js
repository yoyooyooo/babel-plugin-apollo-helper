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
export default App;

export const query = gql`
  query {
    a {
      b
    }
  }
`;
