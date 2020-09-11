import { Box, Columns, Heading, Text } from "bumbag";

import ErrorPolicyToggle from "./toggles/ErrorPolicyToggle";
import NullabilityToggle from "./toggles/NullabilityToggle";
import ResolverReturnToggle from "./toggles/ResolverReturnToggle";

export default function Toggles() {
  return (
    <Box>
      <Heading use="h2" fontSize="200" textTransform="uppercase" color="gray" fontWeight="semibold">
        Toggles
      </Heading>
      <Columns spacing="major-4" marginTop="major-1">
        <Columns.Column spread={4}>
          <ErrorPolicyToggle />
        </Columns.Column>
        <Columns.Column spread={4}>
          <NullabilityToggle />
        </Columns.Column>
        <Columns.Column spread={4}>
          <ResolverReturnToggle />
        </Columns.Column>
      </Columns>
    </Box>
  );
}
