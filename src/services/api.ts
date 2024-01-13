import { createApi } from "@reduxjs/toolkit/query/react";
import { GraphQLClient } from "graphql-request";

const graphqlClient = new GraphQLClient(
  `${process.env.REACT_APP_API_URL}/graphql`,
  { headers: {} }
);

export default createApi({
  reducerPath: "api",
  tagTypes: ["Posts", "Post"],
  baseQuery: ({ query, variables }: { query: string; variables: any }) => {
    return graphqlClient.request(query, variables);
  },
  endpoints: () => ({}),
});
