import { Box, Code, Columns, Heading, Link, Text } from "bumbag";

import HighlightedCode from "bumbag-addon-highlighted-code";
import Section from "../section";
import dedent from "dedent";
import { nullabilityState } from "../toggles/NullabilityToggle";
import { useRecoilValue } from "recoil";

function getSchema(nullability) {
  return /* GraphQL*/ dedent`
    type Player {
      name: ${nullability === "nullable" ? "String" : "String!"}
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

export default function SchemaPreview() {
  const { value: nullable } = useRecoilValue(nullabilityState);

  return (
    <Section
      heading="Schema (Server)"
      description={
        <>
          This is the{" "}
          <Link href="https://www.prisma.io/blog/graphql-sdl-schema-definition-language-6755bcb9ce51">
            Schema Definiton Language (SDL)
          </Link>{" "}
          that the server will use when executing the request. Note the
          difference in nullability for <Code>Player.name</Code>.
        </>
      }
    >
      <HighlightedCode
        fontSize="150"
        isBlock
        language="graphql"
        code={getSchema(nullable)}
      />
    </Section>
  );
}
