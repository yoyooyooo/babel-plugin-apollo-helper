import { graphql } from '@apollo/react-hoc';
export { getList } from './index.gql';
export default require('lodash/flowRight')(
  graphql(require('./index.gql').getList, {
    name: 'getList'
  }),
  graphql(
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
  )
)(props => {
  return (
    <div>
      <span>1</span>
    </div>
  );
});
