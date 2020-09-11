import { Box, Button, Columns, Heading } from "bumbag";

import ResolverPreview from "./previews/ResolverPreview";
import SchemaPreview from "./previews/SchemaPreview";
import UseQueryPreview from "./previews/UseQueryPreview";
import { useState } from "react";

export default function Preview() {
  const [showPreviews, setShowPreviews] = useState(true);
  const togglePreviews = () => setShowPreviews(!showPreviews);

  return (
    <Box>
      <div
        style={{
          marginTop: "-1rem",
          marginBottom: showPreviews ? "0.5rem" : "-1rem",
          display: "flex",
          alignItems: "baseline",
        }}
      >
        <Heading
          use="h2"
          fontSize="200"
          textTransform="uppercase"
          color="gray"
          fontWeight="semibold"
        >
          Runtime Code
        </Heading>
        <Button
          variant="ghost"
          palette="primary"
          marginLeft="major-1"
          onClick={togglePreviews}
        >
          {showPreviews ? "Hide" : "Show"}
        </Button>
      </div>

      {showPreviews && (
        <Columns spacing="major-4">
          <Columns.Column spread={4}>
            <UseQueryPreview />
          </Columns.Column>
          <Columns.Column spread={4}>
            <SchemaPreview />
          </Columns.Column>
          <Columns.Column spread={4}>
            <ResolverPreview />
          </Columns.Column>
        </Columns>
      )}
    </Box>
  );
}
