import { graphql } from '@apollo/react-hoc';
import compose from 'lodash/flowRight';

const App = props => {
  return (
    <div>
      <span>1</span>
    </div>
  );
};

export default App;

export const query1 = gql`
  query queryDemo1 {
    a {
      b
    }
  }
`;
export const query2 = gql`
  query queryDemo2 {
    c {
      d
    }
  }
`;
