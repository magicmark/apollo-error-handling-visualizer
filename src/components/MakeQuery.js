import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { gql, useQuery } from "@apollo/client";
import { Box, Card, Code, Heading } from "bumbag";

import HighlightedCode from "bumbag-addon-highlighted-code";
import Section from "./section";

const GET_BEST_SOCCER_PLAYER = gql`
  query {
    soccerTeam(name: "Manchester United") {
      player(shirtNumber: 9) {
        name
      }
    }
  }
`;

function QueryMaker({ useQueryOptions }) {
  const { loading, data, error } = useQuery(
    GET_BEST_SOCCER_PLAYER,
    useQueryOptions
  );

  return (
    <Box>
      <Heading
        use="h2"
        fontSize="200"
        textTransform="uppercase"
        color="gray"
        fontWeight="semibold"
      >
        Result
      </Heading>
      <Box marginTop="major-3">
        <Section
          heading="Response"
          description={
            <>
              Shows the results for <Code>data</Code> and <Code>error</Code>{" "}
              (from <Code>MyComponent</Code> - see above). Click the network tab
              in developer tools to poke about some more.
            </>
          }
        >
          <Card>
            <HighlightedCode
              fontSize="150"
              isBlock
              language="json"
              code={JSON.stringify({ data, error, loading }, null, 2)}
            />
          </Card>
        </Section>
      </Box>
    </Box>
  );
}

export default function MakeQuery(props) {
  /**
   * recreate apollo client on each render to avoid bad cache/sync issues
   * @see https://github.com/apollographql/apollo-client/issues/7045
   */
  const apolloClient = new ApolloClient({
    cache: new InMemoryCache({
      // hide __typename from the response
      addTypename: false,
    }),
    uri: "/api/graphql",
  });

  return (
    <ApolloProvider client={apolloClient}>
      <QueryMaker {...props} />
    </ApolloProvider>
  );
}
