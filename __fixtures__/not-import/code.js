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

export const query2 = gql`
  query queryDemo2 {
    c {
      d
    }
  }
`;
