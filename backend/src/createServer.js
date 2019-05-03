const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');

const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const db = require('./db');

// Create GraphQL Yoga server
function createServer() {
  return new GraphQLServer({
    //! has to be this path or won't find the schema!
    typeDefs: './src/schema.graphql',
    resolvers: {
      Mutation,
      Query
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    // get the context for every request
    // so we can access the db from the resolvers
    context: req => ({
      ...req,
      db
    })
  });
}

module.exports = createServer;
