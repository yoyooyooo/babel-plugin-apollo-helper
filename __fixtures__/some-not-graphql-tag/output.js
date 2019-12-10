import { graphql } from '@apollo/react-hoc';
export default graphql(
  gql`
    query queryDemo1 {
      a {
        b
      }
    }
  `,
  {
    name: 'query1'
  }
)(props => {
  return (
    <div>
      <span>1</span>
    </div>
  );
});
export const query2 = gqll`
  query queryDemo2 {
    a {
      b
    }
  }
`;
