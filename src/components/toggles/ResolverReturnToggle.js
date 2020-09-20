import { SelectMenu, Text } from "bumbag";
import { atom, useRecoilState } from "recoil";

import Section from "../section";

const OPTIONS = [

  { key: 1, label: "return 'Anthony Martial'", value: "returnValue" },
  { key: 2, label: "return null", value: "returnNull" },
  {
    key: 3,
    label: "throw new Error('yikes')",
    value: "throwError",
  },
  {
    key: 4,
    label: "throw new InternalServerError()",
    value: "networkError",
  },
];

export const resolverBehaviorState = atom({
  key: "resolverBehavior",
  default: OPTIONS[0],
});

export default function ResolverError() {
  const [state, setState] = useRecoilState(resolverBehaviorState);

  return (
    <Section
      alignBottom
      heading="Resolver Behaviour"
      description="Toggle if the resolver method should return an error or not."
    >
      <SelectMenu
        alignY="bottom"
        onChange={setState}
        renderOption={({ MatchedLabel }) => (
          <React.Fragment>
            <Text use="samp">
              <MatchedLabel />
            </Text>
          </React.Fragment>
        )}
        options={OPTIONS}
        placeholder="Select a resolver error option..."
        value={state}
      />
    </Section>
  );
}
