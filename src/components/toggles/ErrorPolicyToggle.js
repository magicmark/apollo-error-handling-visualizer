import { Code, Link, SelectMenu, Text } from "bumbag";
import { atom, useRecoilState } from "recoil";

import Section from "../section";

const ERROR_POLICY_OPTIONS = [
  {
    key: 1,
    label: "none",
    value: "none",
    isDefault: true,
  },
  { key: 2, label: "ignore", value: "ignore" },
  { key: 3, label: "all", value: "all" },
];

export const errorPolicyState = atom({
  key: "errorPolicy",
  default: ERROR_POLICY_OPTIONS[0],
});

export default function ErrorPolicyToggle() {
  const [errorPolicy, setErrorPolicy] = useRecoilState(errorPolicyState);

  return (
    <Section
      alignBottom
      heading="Error Policy"
      description={
        <>
          Toggle <Code>errorPolicy</Code> to see how the response
          objects change.{" "}
          <Link
            href="https://www.apollographql.com/docs/react/data/error-handling/#error-policies"
          >
            See docs.
          </Link>
        </>
      }
    >
      <SelectMenu
        onChange={setErrorPolicy}
        renderOption={({ MatchedLabel, option: { isDefault } }) => (
          <React.Fragment>
            <Text use="samp">
              <MatchedLabel />
            </Text>
            <br />
            <Text fontSize="100">{isDefault && "(default)"}</Text>
          </React.Fragment>
        )}
        options={ERROR_POLICY_OPTIONS}
        placeholder="Select an error policy..."
        value={errorPolicy}
      />
    </Section>
  );
}
