import { graphql } from '@apollo/react-hoc';

export default props => {
  return (
    <div>
      <span>1</span>
    </div>
  );
};

export const query = gql`
  query queryDemo {
    a {
      b
    }
  }
`;
