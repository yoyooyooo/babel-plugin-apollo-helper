import { graphql } from '@apollo/react-hoc';
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
)(
  class App extends Component {
    render() {
      return (
        <div>
          <span>1</span>
        </div>
      );
    }
  }
);
