import { graphql } from '@apollo/react-hoc';
import compose from 'lodash/flowRight';

const App = props => {
  return (
    <div>
      <span>1</span>
    </div>
  );
};

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
      name: 'query1'
    }
  ),
  graphql(
    gql`
      query queryDemo2 {
        c {
          d
        }
      }
    `,
    {
      name: 'query2'
    }
  )
)(App);
