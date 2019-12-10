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

export default graphql(
  gql`
    query {
      a {
        b
      }
    }
  `,
  {
    name: 'query'
  }
)(App);
