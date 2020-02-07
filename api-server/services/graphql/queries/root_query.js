const graphql = require('graphql');
const { GraphQLString, GraphQLNonNull, GraphQLObjectType } = graphql;
const { UserType } = require('../types/types');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLString) } },
      resolve(parentValue, args, req) {
        return 'test';
      }
    }
  }
});

module.exports = RootQueryType;
