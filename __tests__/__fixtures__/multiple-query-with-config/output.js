import { graphql } from '@apollo/react-hoc';
import compose from 'lodash/flowRight';
export default compose(
  graphql(
    gql`
      query queryDemo1 {
        a {
          b
        }
      }
    `,
    {
      name: 'query1',
      a: 1
    }
  ),
  graphql(
    gql`
      query queryDemo2 {
        a {
          b
        }
      }
    `,
    {
      name: 'query2',
      b: 2
    }
  )
)(props => {
  return (
    <div>
      <span>1</span>
    </div>
  );
});
