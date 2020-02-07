const graphql = require('graphql');
const { GraphQLSchema } = graphql;

const Queries = require('../../../../services/graphql/queries/root_query');
const Mutations = require('../../../../services/graphql/mutations/root_mutations');

module.exports = new GraphQLSchema({
  query: Queries,
  mutation: Mutations
});
