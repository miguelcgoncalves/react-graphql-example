import path from "path";
import fs from "fs";
import * as schema from "@graphql-tools/schema";
import { GraphQLSchema } from "graphql";
import * as resolvers from "./resolvers";

const typeDefsDir = path.join(__dirname, "./typedefs");

const typeDefs = fs
  .readdirSync(typeDefsDir)
  .map((file) => fs.readFileSync(path.join(typeDefsDir, file)));

const excutableSchema: GraphQLSchema = schema.makeExecutableSchema({
  typeDefs: typeDefs.join("\n"),
  resolvers,
});

export default excutableSchema;
