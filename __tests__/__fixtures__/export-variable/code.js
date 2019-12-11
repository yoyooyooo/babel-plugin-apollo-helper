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

export const query = gql`
  query queryDemo {
    a {
      b
    }
  }
`;
