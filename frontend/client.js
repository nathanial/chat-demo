import ApolloClient from "apollo-boost";
import gql from 'graphql-tag';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

export async function hello(){
  return await client.query({
    query: gql`
      { 
        hello 
      }
    `
  })
}