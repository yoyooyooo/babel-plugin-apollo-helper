export default require('lodash/flowRight')(
  require('@apollo/react-hoc').graphql(
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
  require('@apollo/react-hoc').graphql(
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
)(props => {
  return (
    <div>
      <span>1</span>
    </div>
  );
});
