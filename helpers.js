const _ = require('lodash');
const t = require('@babel/types');

function createGraphql({ path, options = {} }, query, name, restOptions = []) {
  const matchedGraphql =
    options.packages && options.packages.find(a => a.specifier === 'graphql');
  const matchedOptionName = restOptions.find(a => a.key.name === 'name');
  const requireNode = t.memberExpression(
    t.callExpression(t.Identifier('require'), [
      t.stringLiteral(
        (matchedGraphql && matchedGraphql.source) || '@apollo/react-hoc'
      )
    ]),
    t.identifier('graphql')
  );
  return t.callExpression(
    path.scope.bindings.graphql
      ? path.scope.bindings.graphql.identifier
      : t.toExpression(requireNode),
    [
      query,
      t.objectExpression([
        t.objectProperty(
          t.identifier('name'),
          matchedOptionName ? matchedOptionName.value : name
        ),
        ...restOptions.filter(a => a.key.name !== 'name')
      ])
    ]
  );
}
exports.createGraphql = createGraphql;
exports.injectGql = function(
  { t, options = {} },
  outerPath,
  targetPath,
  component
) {
  let graphqls = [];
  const indexes = [];
  outerPath.container.forEach((node, i) => {
    if (t.isExportNamedDeclaration(node)) {
      if (node.declaration) {
        const query = node.declaration.declarations[0].init;
        let queryArgs, graphqlQuery, graphqlConfig;
        if (t.isArrayExpression(query)) {
          // with config
          [graphqlQuery, graphqlConfig] = query.elements;
        } else {
          // no config
          graphqlQuery = query;
        }

        if (
          (t.isTaggedTemplateExpression(graphqlQuery) &&
            (graphqlQuery.tag.name === 'gql' ||
              graphqlQuery.tag.name === 'graphql')) ||
          (t.isCallExpression(graphqlQuery) &&
            (graphqlQuery.callee.name === 'gql' ||
              graphqlQuery.callee.name === 'graphql'))
        ) {
          queryArgs = [graphqlQuery, graphqlConfig];
        }
        if (queryArgs) {
          // matched graphql query
          const name = node.declaration.declarations[0].id.name;
          graphqls.push(
            createGraphql(
              { path: outerPath, t },
              queryArgs[0],
              t.stringLiteral(name),
              queryArgs[1] ? queryArgs[1].properties : []
            )
          );
          if (outerPath.scope.bindings[name].references < 2) {
            // outerPath.container[i] = null;
            // node.parentPath.remove();
            indexes.push(i);
          }
        }
      } else if (node.source && /\.(gql|graphql)$/.test(node.source.value)) {
        node.specifiers.forEach(specifier => {
          const requireNode = t.memberExpression(
            t.callExpression(t.Identifier('require'), [
              t.stringLiteral(node.source.value)
            ]),
            t.identifier(specifier.exported.name)
          );
          graphqls.push(
            createGraphql(
              { path: outerPath, t },
              requireNode,
              t.stringLiteral(specifier.exported.name)
            )
          );
        });
      }
    }
  });
  if (graphqls.length) {
    const matchedCompose =
      options.packages && options.packages.find(a => a.specifier === 'compose');
    const requireNode = t.callExpression(t.Identifier('require'), [
      t.stringLiteral(
        (matchedCompose && matchedCompose.source) || 'lodash/flowRight'
      )
    ]);
    _.remove(outerPath.container, (a, i) => indexes.includes(i));
    targetPath.replaceWith(
      t.callExpression(
        graphqls.length > 1
          ? t.callExpression(
              outerPath.scope.bindings.compose
                ? outerPath.scope.bindings.compose.identifier
                : requireNode,
              graphqls
            )
          : graphqls[0],
        [component]
      )
    );
  }
};
