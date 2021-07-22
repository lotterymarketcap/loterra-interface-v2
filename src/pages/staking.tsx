import Head from "next/head";
import tw, { css } from "twin.macro";

import Layout from "../components/Layout";

const bgStyles = css`
  background: linear-gradient(328.75deg, #493c85 -5.49%, #0f0038 104.44%);
  box-shadow: 0px 28px 48px #0f0038;
  ${tw`inline-block align-bottom bg-blue-dark rounded-3xl p-12 text-left shadow-xl transform transition-all sm:align-middle max-w-2xl`}
`;

export default function Staking() {
  return (
    <>
      <Head>
        <title>LoTerra</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <main tw="relative mt-16 lg:mt-24 pb-4">
          <div tw="flex justify-center pt-16">
            <div css={bgStyles}>
              <h1 tw="text-white text-4xl font-bold text-center pb-4 ">
                Staking
              </h1>
              <h2 tw="max-w-md text-gray-400 text-center text-xl">
                Unstake or stake your LOTA in order to get rewards and voting
                weight
              </h2>
              <input
                id="amount"
                name="amount"
                type="amount"
                required
                tw="w-full px-5 py-3 mb-8 mt-12 placeholder-gray-500 bg-indigo-dark focus:ring-indigo-500 focus:border border-gray-700 border border-gray-600 rounded-md"
                placeholder="Amount"
              />
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <div tw="grid gap-4 lg:grid-cols-3 lg:max-w-none">
                  <div tw="self-end">
                    <span tw="float-right text-green-light font-medium underline mr-1 text-sm">
                      MAX
                    </span>
                    <button
                      type="button"
                      tw="w-full flex items-center justify-center px-5 py-3 mb-2  border border-gray-700 text-base text-white font-medium rounded-md bg-indigo-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Stake
                    </button>
                    <span tw="float-right text-gray-400 text-sm">
                      Available: <strong>100 LOTA</strong>
                    </span>
                  </div>
                  <div tw="self-end">
                    <span tw="float-right text-green-light font-medium underline mr-1 text-sm">
                      MAX
                    </span>
                    <button
                      type="button"
                      tw="w-full flex items-center justify-center px-5 py-3 mb-2 border border-gray-700 text-base text-white font-medium rounded-md bg-indigo-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Unstake
                    </button>
                    <span tw="float-right text-gray-400 text-sm">
                      Available: <strong>100 LOTA</strong>
                    </span>
                  </div>
                  <div tw="self-end">
                    <button
                      type="button"
                      tw="w-full flex items-center justify-center px-5 py-3 mb-2 border border-gray-700 text-base text-white font-medium rounded-md bg-indigo-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span tw="float-right text-gray-400">Claim unstake</span>
                    </button>
                    <span tw="float-right text-gray-400 text-sm">
                      Available: <strong>100 LOTA</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
