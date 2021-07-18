import Head from "next/head";
import tw, { css } from "twin.macro";

import Layout from "../components/Layout";

export default function Home() {
  return (
    <>
      <Head>
        <title>LoTerra</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <main tw="relative mt-16 lg:mt-24 pb-4">
          <div tw="flex justify-center">
            <h1 tw="text-white text-3xl">DAO</h1>
          </div>
        </main>
      </Layout>
    </>
  );
}
