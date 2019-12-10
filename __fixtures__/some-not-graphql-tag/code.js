import { graphql } from '@apollo/react-hoc';

export default props => {
  return (
    <div>
      <span>1</span>
    </div>
  );
};

export const query1 = gql`
  query queryDemo1 {
    a {
      b
    }
  }
`;

export const query2 = gqll`
  query queryDemo2 {
    a {
      b
    }
  }
`;
