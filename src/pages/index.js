import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import { Provider as BumbagProvider } from "bumbag";
import Head from "next/head";
import Playground from "../components/Playground";
import { RecoilRoot } from "recoil";

const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false,
  }),
  uri: "/api/graphql",
  fetchPolicy: "network-only",
  defaultOptions: {
    query: {
      fetchPolicy: "network-only",
    },
  },
});

export default function Index() {
  return (
    <>
      <Head>
        <title>Apollo Error Handling Visualizer</title>
      </Head>

      <BumbagProvider>
        <RecoilRoot>
          <ApolloProvider client={apolloClient}>
            <Playground />
          </ApolloProvider>
        </RecoilRoot>
      </BumbagProvider>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
        }
      `}</style>
    </>
  );
}
