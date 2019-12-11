import { graphql } from '@apollo/react-hoc';
import compose from 'lodash/flowRight';

export default props => {
  return (
    <div>
      <span>1</span>
    </div>
  );
};

export const query1 = [
  gql`
    query queryDemo1 {
      a {
        b
      }
    }
  `,
  { a: 1 }
];
export const query2 = [
  gql`
    query queryDemo2 {
      a {
        b
      }
    }
  `,
  { b: 2 }
];
