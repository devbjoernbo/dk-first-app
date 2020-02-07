const graphql = require('graphql');
const { GraphQLString, GraphQLNonNull, GraphQLObjectType } = graphql;
const { UserType } = require('../types/types');
const AuthService = require('../../passport/authentication');

const RootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    login: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { email, password }, context) {
        return AuthService.login({
          email,
          password,
          req: context.req
        });
      }
    },
    signup: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { email, password }, context) {
        return AuthService.signup({
          email,
          password,
          req: context.req
        });
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, context) {
        const { user } = context.req;
        context.req.logout();
        return user;
      }
    }
  }
});

module.exports = RootMutation;
