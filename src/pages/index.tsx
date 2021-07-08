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
        <main tw="relative mt-16 lg:mt-32 px-4 sm:px-6 lg:px-8 pb-4">
          <span tw="w-full inline-block text-center text-3xl text-pink-500 text-center uppercase">
            Jackpot
          </span>
          <br />
          <span tw="w-full inline-block text-center text-5xl text-white m-4">
            126,257.94 <span tw="text-green-500 text-2xl">UST</span>
          </span>
        </main>
      </Layout>
    </>
  );
}
