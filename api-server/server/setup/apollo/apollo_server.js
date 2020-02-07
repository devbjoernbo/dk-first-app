const schema = require('./schema/schema');
const { ApolloServer } = require('apollo-server-express');

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    const currentUser = req.user || '';

    return { req, currentUser };
  },
  cors: {
    credentials: true
  },
  playground: {
    endpoint: '/graphql',
    settings: {
      'editor.theme': 'light'
    }
  }
});

module.exports = server;
