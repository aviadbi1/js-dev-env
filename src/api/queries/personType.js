/* eslint-disable import/default */

import { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";
import ApiConnections from "./apiConnections";

const PersonType = new GraphQLObjectType({
  name: "Person",
  description: "...",

  fields: () => ({
    id: {
      type: GraphQLString
    },
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    username: {
      type: GraphQLString
    },
    friends: {
      type: new GraphQLList(PersonType),
      resolve: root => root.friends.map(ApiConnections.getPersonByURL)
    }
  })
});

export default PersonType;
