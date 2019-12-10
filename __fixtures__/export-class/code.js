import { graphql } from '@apollo/react-hoc';

export default class App extends Component {
  render() {
    return (
      <div>
        <span>1</span>
      </div>
    );
  }
}

export const query = gql`
  query {
    a {
      b
    }
  }
`;
