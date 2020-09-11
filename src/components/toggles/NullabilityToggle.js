import {Code, Link, SelectMenu, Text} from "bumbag";
import { atom, useRecoilState } from "recoil";

import Section from "../section";

const OPTIONS = [
  {
    key: 1,
    label: "Nullable (String)",
    value: "nullable",
  },
  { key: 2, label: "Non-Nullable (String!)", value: "notNullable" },
];

export const nullabilityState = atom({
  key: "nullability",
  default: OPTIONS[0],
});

export default function NullabilityToggle() {
  const [state, setState] = useRecoilState(nullabilityState);

  return (
    <Section
      alignBottom
      heading="Nullability"
      description={
        <>
          Toggle if the <Code>Player.name</Code> field is nullable or not to see
          how the response objects change.{" "}
          <Link href="http://spec.graphql.org/draft/#sec-Errors-and-Non-Nullability">
            See docs for errors and nullability.
          </Link>
        </>
      }
    >
      <SelectMenu
        onChange={setState}
        options={OPTIONS}
        placeholder="Select a nullability option..."
        value={state}
      />
    </Section>
  );
}
