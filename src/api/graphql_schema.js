/* eslint-disable import/default */

import { GraphQLSchema, GraphQLObjectType, GraphQLString } from "graphql";
import PersonType from "./queries/personType";
import ApiConnections from "./queries/apiConnections";

const QueryType = new GraphQLObjectType({
  name: "Query",
  description: "...",

  fields: () => ({
    person: {
      type: PersonType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: (root, args) =>
        ApiConnections.getPersonByURL(`/users/${args.id}/`)
    }
  })
});

const schema = new GraphQLSchema({
  query: QueryType
});

export default schema;
