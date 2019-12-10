<div align="center">
<h1>babel-plugin-apollo-helper</h1>
auto inject graphql query by apollo hoc
</div>

[![NPM version](https://img.shields.io/npm/v/babel-plugin-apollo-helper.svg?style=flat)](https://npmjs.org/package/babel-plugin-apollo-helper)
[![NPM downloads](http://img.shields.io/npm/dm/babel-plugin-apollo-helper.svg?style=flat)](https://npmjs.org/package/babel-plugin-apollo-helper)

## install

```shell
npm i -D babel-plugin-apollo-helper
// or
yarn add -D babel-plugin-apollo-helper
```

then `.babelrc`:

```json
{
  "plugins": [
    "babel-plugin-apollo-helper",
    {
      "packages": Array<{specifier: string, source: string}>,
      "include": Regex[],
      "exclude": Regex[]
    }
  ]
}
```

`config.packages` default is :

```json
"packages": [
  { "specifier": "graphql", "source": "@apollo/react-hoc" },
  { "specifier": "compose", "source": "lodash/flowRight" }
]
```

you can overide your custom graphql and compose

## usage

input:

```jsx
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
```

output:

```jsx
import { graphql } from '@apollo/react-hoc';
export default graphql(
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
)(props => {
  return (
    <div>
      <span>1</span>
    </div>
  );
});
```

more usages can see [feature](https://github.com/yoyooyooo/babel-plugin-apollo-helper/tree/master/__fixtures__)

## with babel-plugin-macros

### install

`.babelrc`

```shell
{
  plugins: ['babel-plugin-macros']
}
```

### usage

anything be wrapped by autoInjectGql will be injected graphql queries which is exported in current js.

```jsx
import { graphql } from '@apollo/react-hoc';
import autoInjectGql from 'babel-plugin-apollo-helper/macro';

export default autoInjectGql(props => {
  return (
    <div>
      <span>1</span>
    </div>
  );
});

export const query = gql`
  query queryDemo {
    a {
      b
    }
  }
`;
```
