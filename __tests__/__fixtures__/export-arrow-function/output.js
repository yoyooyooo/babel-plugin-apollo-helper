import { graphql } from '@apollo/react-hoc';
export default graphql(
  gql`
    query queryDemo {
      a {
        b
      }
    }
  `,
  {
    name: 'query'
  }
)(props => {
  return (
    <div>
      <span>1</span>
    </div>
  );
});
