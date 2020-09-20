import assert from "assert";
import { graphql } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";

function getTypeDefs(nullable) {
  return /* GraphQL */ `
    type Player {
      name: ${nullable === "nullable" ? "String" : "String!"}
      shirtNumber: Int
      position: String
    }

    type SoccerTeam {
      name: String
      player(shirtNumber: Int!): Player
    }

    type Query {
      soccerTeam(name: String!): SoccerTeam
    }
  `;
}

function getResolvers(resolverBehaviour) {
  return {
    Query: {
      soccerTeam: (_, { name }) => {
        if (name !== "Manchester United") {
          throw new Error("Sorry, we only support Manchester United");
        }

        return { name };
      },
    },
    SoccerTeam: {
      player: (_, { shirtNumber }) => {
        if (shirtNumber !== 9) {
          throw new Error("Sorry, we only have data on player 9");
        }

        return { shirtNumber: 9 };
      },
    },
    Player: {
      name: () => {
        if (resolverBehaviour === "throwError") {
          throw new Error("yikes!");
        } else if (resolverBehaviour === "returnValue") {
          return "Anthony Martial";
        } else if (resolverBehaviour === "returnNull") {
          return null;
        }

        throw new Error(
          `bad value for resolverBehaviour - ${resolverBehaviour}`
        );
      },
      position: () => "Forward",
    },
  };
}

function executeQuery(query, variables, resolverBehaviour, nullable) {
  const schema = makeExecutableSchema({
    typeDefs: getTypeDefs(nullable),
    resolvers: getResolvers(resolverBehaviour),
  });

  return graphql(schema, query, null, null, variables);
}

export default async (req, res) => {
  assert(
    typeof req.headers["x-demo-nullable"] === "string",
    "Expected x-demo-nullable header to be set"
  );
  assert(
    typeof req.headers["x-demo-resolver-behaviour"] === "string",
    "Expected x-demo-resolver-behaviour header to be set"
  );
  assert(req.method === "POST", "I only support POST requests");

  const { query, variables } = req.body;
  assert(typeof query === "string", "expected to recieve a query string");

  if (req.headers["x-demo-resolver-behaviour"] === "networkError") {
    res.statusCode = 500;
    res.end('Internal Server Error');
    return;
  }

  const response = await executeQuery(
    query,
    variables,
    req.headers["x-demo-resolver-behaviour"],
    req.headers["x-demo-nullable"]
  );

  res.statusCode = 200;
  res.json(response);
};
