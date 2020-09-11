import { Box, Card, Code, Heading, Text } from "bumbag";
import { gql, useQuery } from "@apollo/client";

import HighlightedCode from "bumbag-addon-highlighted-code";
import Section from "./section";
import { errorPolicyState } from "./toggles/ErrorPolicyToggle";
import { nullabilityState } from "./toggles/NullabilityToggle";
import { resolverBehaviorState } from "./toggles/ResolverReturnToggle";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

const GET_BEST_SOCCER_PLAYER = gql`
  query {
    soccerTeam(name: "Manchester United") {
      player(shirtNumber: 9) {
        name
      }
    }
  }
`;

export default function Preview() {
  const { value: errorPolicy } = useRecoilValue(errorPolicyState);
  const { value: nullable } = useRecoilValue(nullabilityState);
  const { value: resolverBehaviour } = useRecoilValue(resolverBehaviorState);

  const { loading, data, error, refetch } = useQuery(GET_BEST_SOCCER_PLAYER, {
    errorPolicy,
    context: {
      headers: {
        "X-Demo-Nullable": nullable,
        "X-Demo-Resolver-Behaviour": resolverBehaviour,
      },
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch, errorPolicy, nullable, resolverBehaviour]);

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
