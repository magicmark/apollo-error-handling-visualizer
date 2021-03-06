import { Box, Code, Columns, Heading, Link, Text } from "bumbag";

import HighlightedCode from "bumbag-addon-highlighted-code";
import Section from "../section";
import dedent from "dedent";
import { resolverBehaviorState } from "../toggles/ResolverReturnToggle";
import { useRecoilValue } from "recoil";

function getResolver(resolverBehaviour) {
  if (!resolverBehaviour) return "Select resolver behaviour!";

  if (resolverBehaviour === "throwError") {
    return dedent`
      Player: {
        name(obj, args, context, info) {
          // Throw a resolver error (that will be caught by graphql-js)
          throw new Error('yikes!');
        }
      }
    `;
  }

  if (resolverBehaviour === "networkError") {
    return dedent`
      Player: {
        name(obj, args, context, info) {
          // Return HTTP 500 from the server to represent a network level error
          throw new InternalServerError();
        }
      }
    `;
  }

  if (resolverBehaviour === "returnValue") {
    return dedent`
      Player: {
        name(obj, args, context, info) {
          return 'Anthony Martial';
        }
      }
    `;
  }

  if (resolverBehaviour === "returnNull") {
    return dedent`
      Player: {
        name(obj, args, context, info) {
          return null;
        }
      }
    `;
  }
}

export default function SchemaPreview() {
  const { value: resolverBehaviour } = useRecoilValue(resolverBehaviorState);

  return (
    <Section
      heading="Resolver (Server)"
      description={
        <>
          This is the{" "}
          <Link href="https://graphql.org/learn/execution/#root-fields-resolvers">
            resolver method
          </Link>{" "}
          that will be executed for <Code>Player.name</Code>.<br /><br />
        </>
      }
    >
      <HighlightedCode
        fontSize="150"
        isBlock
        language="graphql"
        code={getResolver(resolverBehaviour)}
      />
    </Section>
  );
}
