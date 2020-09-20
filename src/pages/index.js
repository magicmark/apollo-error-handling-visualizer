import { Provider as BumbagProvider } from "bumbag";
import Head from "next/head";
import Playground from "../components/Playground";
import { RecoilRoot } from "recoil";
import execa from "execa";

export default function Index({ apolloVersion }) {
  return (
    <>
      <Head>
        <title>Apollo Error Handling Visualizer</title>
      </Head>

      <BumbagProvider>
        <RecoilRoot>
          <Playground apolloVersion={apolloVersion} />
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

export async function getStaticProps() {
  const { stdout } = await execa.command(
    "yarn list --pattern @apollo/client --depth=0 --json"
  );

  const apolloVersion = JSON.parse(stdout).data.trees[0].name.split("@")[2];

  return {
    props: { apolloVersion },
  };
}
