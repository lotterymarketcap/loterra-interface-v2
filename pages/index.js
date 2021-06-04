import Head from "next/head";
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
        <main className="relative px-4 sm:px-6 lg:px-8 pb-4">Loterra</main>
      </Layout>
    </>
  );
}
