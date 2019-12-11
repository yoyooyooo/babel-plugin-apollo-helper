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
    name: 'query',
    a: 1,
    b: 2
  }
)(props => {
  return (
    <div>
      <span>1</span>
    </div>
  );
});
