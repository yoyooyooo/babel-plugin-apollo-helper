[English](./README.md) | 简体中文

<div align="center">
<h1>babel-plugin-apollo-helper</h1>
使用Apollo的时候，自动把graphql查询注入hoc
</div>

[![Build Status](https://travis-ci.org/yoyooyooo/babel-plugin-apollo-helper.svg?branch=master)](https://travis-ci.org/yoyooyooo/babel-plugin-apollo-helper)
[![codecov](https://codecov.io/gh/yoyooyooo/babel-plugin-apollo-helper/branch/master/graph/badge.svg)](https://codecov.io/gh/yoyooyooo/babel-plugin-apollo-helper)
[![NPM version](https://img.shields.io/npm/v/babel-plugin-apollo-helper.svg?style=flat)](https://npmjs.org/package/babel-plugin-apollo-helper)
[![NPM downloads](http://img.shields.io/npm/dm/babel-plugin-apollo-helper.svg?style=flat)](https://npmjs.org/package/babel-plugin-apollo-helper)

## 安装

```shell
npm i -D babel-plugin-apollo-helper
// or
yarn add -D babel-plugin-apollo-helper
```

`.babelrc`配置:

```js
{
  plugins: [
    "babel-plugin-apollo-helper",
    {
      packages: Array<{specifier: string, source: string}>,
      include: Regex[],
      exclude: Regex[]
    }
  ]
}
```

`config.packages` 默认 :

```js
packages: [
  { specifier: 'graphql', source: '@apollo/react-hoc' },
  { specifier: 'compose', source: 'lodash/flowRight' }
];
```

你可以设置覆盖默认的 graphql 和 compose 来源

## 简单用法

输入:

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

输出:

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

更多用法查看 [feature](https://github.com/yoyooyooo/babel-plugin-apollo-helper/tree/master/__test__/__fixtures__)

## babel-plugin-macros 版本

### 必须安装 babel-plugin-macros

`.babelrc`

```shell
{
  plugins: ['babel-plugin-macros']
}
```

### 用法

任何被 export 的 graphql 查询都会通过 hoc 的方式被注入被`autoInjectGql`包裹的组件

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
