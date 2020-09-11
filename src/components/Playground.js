import {
  Box,
  Card,
  Container,
  Heading,
  Link,
  PageContent,
  PageWithHeader,
  Paragraph,
  Stack,
  Text,
  TopNav,
  applyTheme,
  css,
  palette,
  space,
} from "bumbag";

import Preview from "./Preview";
import Result from "./Result";
import Toggles from "./Toggles";

const BorderBox = applyTheme(Box, {
  styles: {
    base: (styleProps) => css`
      padding: ${space(4, "major")(styleProps)}rem 0;
      border-bottom: 1px solid
        ${palette("white800", { dark: "gray700" })(styleProps)};
    `,
  },
});

export default function Playground() {
  return (
    <PageWithHeader
      header={
        <Container isFluid>
          <TopNav>
            <TopNav.Section>
              <TopNav.Item>
                <Heading font="mono" use="h1" fontSize="300" color="red">
                  <span
                    role="img"
                    aria-label="siren"
                    style={{ marginRight: "11px" }}
                  >
                    🚨
                  </span>
                  Apollo Error Handling Visualizer
                </Heading>
              </TopNav.Item>
            </TopNav.Section>
          </TopNav>
        </Container>
      }
    >
      <PageContent isFluid>
        <Card marginBottom="major-1">
          <Stack spacing="major-3">
            <Paragraph fontSize="150">
              <Heading use="strong" fontSize="150">
                About
              </Heading>
            </Paragraph>
            <Paragraph>
              This tool shows the relationship between{" "}
              <Link href="http://spec.graphql.org/draft/#sec-Errors-and-Non-Nullability">
                nullability
              </Link>{" "}
              and error handling in{" "}
              <Link href="https://graphql.org/">GraphQL</Link>, with specific
              respect to{" "}
              <Link href="https://www.apollographql.com/docs/react/">
                Apollo Client
              </Link>
              .
            </Paragraph>
            <Paragraph>
              Set the toggles to see how the request / response will change.
              Scroll to the bottom to see the result!
            </Paragraph>
            <Paragraph>
              Questions / Suggestions? Reach out to me at{" "}
              <Link href="https://twitter.com/mark_larah">@mark_larah</Link>!
            </Paragraph>
          </Stack>
        </Card>
        <BorderBox>
          <Toggles />
        </BorderBox>
        <BorderBox>
          <Preview />
        </BorderBox>
        <BorderBox>
          <Result />
        </BorderBox>
      </PageContent>
    </PageWithHeader>
  );
}
