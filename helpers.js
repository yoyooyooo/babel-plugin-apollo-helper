const template = require('@babel/template');

function createGraphql(
  { path, options = {}, t },
  query,
  name,
  restOptions = []
) {
  const matchedGraphql =
    options.packages && options.packages.find(a => a.specifier === 'graphql');
  const matchedOptionName = restOptions.find(a => a.key.name === 'name');
  return t.callExpression(
    path.scope.bindings.graphql
      ? path.scope.bindings.graphql.identifier
      : t.toExpression(
          template.default(
            `require("${(matchedGraphql && matchedGraphql.source) ||
              '@apollo/react-hoc'}").graphql`
          )()
        ),
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
  injectedPath,
  component
) {
  let graphqls = [];
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
          outerPath.scope.bindings[name].references < 2 &&
            (outerPath.container[i] = null);
        }
      } else if (node.source && /\.(gql|graphql)$/.test(node.source.value)) {
        node.specifiers.forEach(specifier => {
          graphqls.push(
            createGraphql(
              { path: outerPath, t },
              t.toExpression(
                template.default(
                  `require('${node.source.value}').${specifier.exported.name}`
                )()
              ),
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
    injectedPath.replaceWith(
      t.callExpression(
        graphqls.length > 1
          ? t.callExpression(
              outerPath.scope.bindings.compose
                ? outerPath.scope.bindings.compose.identifier
                : t.toExpression(
                    template.default(
                      `require("${(matchedCompose && matchedCompose.source) ||
                        'lodash/flowRight'}")`
                    )()
                  ),
              graphqls
            )
          : graphqls[0],
        [component]
      )
    );
  }
};
