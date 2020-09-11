import { Code, Link, Text } from "bumbag";

import HighlightedCode from "bumbag-addon-highlighted-code";
import Section from "../section";
import dedent from "dedent";
import { errorPolicyState } from "../toggles/ErrorPolicyToggle";
import { useRecoilValue } from "recoil";

function getUseQueryCode(errorPolicy) {
  if (!errorPolicy) return "Select an error policy!";

  const getHook = (padding) => {
    const padLines = (lines) =>
      lines.map((l) => `${Array(padding).fill(" ").join("")}${l}`).join("\n");

    if (errorPolicy === "none") {
      return padLines(["const result = useQuery(GET_BEST_PLAYER);"]);
    }

    if (errorPolicy === "all") {
      return padLines([
        "const result = useQuery(GET_BEST_PLAYER, {",
        "  errorPolicy: 'all'",
        "});",
      ]);
    }

    if (errorPolicy === "ignore") {
      return padLines([
        "const result = useQuery(GET_BEST_PLAYER, {",
        "  errorPolicy: 'ignore'",
        "});",
      ]);
    }
  };

  return dedent`
    const GET_BEST_PLAYER = gql\`
      query {
        soccerTeam(name: "Manchester United") {
          player(shirtNumber: 9) {
            name
          }
        }
      }
    \`;

    function MyComponent() {
${getHook(6)}

      const { data, error, loading } = result;
      return loading ? null: JSON.stringify({ data, error });
    }
  `;
}

export default function UseQueryPreview() {
  const { value: errorPolicy } = useRecoilValue(errorPolicyState);

  return (
    <Section
      heading={
        <>
          <Text use="samp">useQuery</Text> React Hook (Client)
        </>
      }
      description={
        <>
          The runtime code the React component will use to make the query. Note
          the difference in the <Code>errorPolicy</Code> attribute.
        </>
      }
    >
      <HighlightedCode
        fontSize="150"
        isBlock
        language="jsx"
        code={getUseQueryCode(errorPolicy)}
      />
    </Section>
  );
}
