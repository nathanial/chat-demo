const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const {graphql, GraphQLSchema, GraphQLObjectType, GraphQLString} = require('graphql');
const {setupDB, insertMessage} = require('./db');

// setupDB();

var MyGraphQLSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world';
        }
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'ChatMutation',
    fields: {
      sendMessage: {
        type: GraphQLString,
        description: 'Send a message',
        args: {
          message: { type: GraphQLString }
        },
        resolve: async (value, {message}) => {
          const id = await insertMessage(message);
          return id;
        }
      }
    }
  })
});

const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: MyGraphQLSchema,
  graphiql: true
}));

app.listen(4000);