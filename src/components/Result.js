import MakeQuery from "./MakeQuery";

import { errorPolicyState } from "./toggles/ErrorPolicyToggle";
import { nullabilityState } from "./toggles/NullabilityToggle";
import { resolverBehaviorState } from "./toggles/ResolverReturnToggle";
import { useRecoilValue } from "recoil";

export default function Result() {
  const { value: errorPolicy } = useRecoilValue(errorPolicyState);
  const { value: nullable } = useRecoilValue(nullabilityState);
  const { value: resolverBehaviour } = useRecoilValue(resolverBehaviorState);

  const useQueryOptions = {
    errorPolicy,
    fetchPolicy: "no-cache",
    context: {
      headers: {
        "X-Demo-Nullable": nullable,
        "X-Demo-Resolver-Behaviour": resolverBehaviour,
      },
    },
  };

  return <MakeQuery useQueryOptions={useQueryOptions} />;
}
