import Head from "next/head";
import tw from "twin.macro";
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
        <main tw="relative px-4 sm:px-6 lg:px-8 pb-4"></main>
      </Layout>
    </>
  );
}
