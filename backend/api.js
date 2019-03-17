const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const {graphql, GraphQLSchema, GraphQLObjectType, GraphQLString} = require('graphql');

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
  })
});

const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: MyGraphQLSchema,
  graphiql: true
}));

app.listen(4000);