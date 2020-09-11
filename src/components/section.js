import { Box, Heading, Set, Text } from "bumbag";

export default function Section({
  heading,
  description,
  children,
  alignBottom,
}) {
  return (
    <Set orientation="vertical" isFilled spacing="major-2" height="100%">
      <Box>
        <Heading use="h2" fontSize="300">
          {heading}
        </Heading>
        <Text color="gray" fontSize="150">
          {description}
        </Text>
      </Box>

      <Box marginTop={alignBottom === true ? "auto" : "inherit"}>
        {children}
      </Box>
    </Set>
  );
}
