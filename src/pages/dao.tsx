import Head from "next/head";
import tw, { css } from "twin.macro";
import { LCDClient, WasmAPI } from "@terra-money/terra.js";
import { useEffect, useState, useCallback } from "react";

import Layout from "../components/Layout";

const bgStyles = css`
  background: linear-gradient(328.75deg, #493c85 -5.49%, #0f0038 104.44%);
  box-shadow: 0px 28px 48px #0f0038;
  ${tw`inline-block align-bottom bg-blue-dark rounded-3xl p-12 text-left shadow-xl transform transition-all sm:align-middle max-w-2xl`}
`;

export default function DAO() {
  const [polls, setPolls] = useState([]);

  const fetchContractQuery = useCallback(async () => {
    const terra = new LCDClient({
      URL: "https://lcd.terra.dev/",
      chainID: "columbus-4",
    });
    const api = new WasmAPI(terra.apiRequester);
    try {
      const contractConfigInfo = await api.contractQuery(
        process.env.NEXT_PUBLIC_LOTTERY_ADDRESS_V2,
        {
          config: {},
        }
      );

      const pollCount = contractConfigInfo.poll_count;
      for (let x = 1; x <= pollCount; x++) {
        const contractInfo = await api.contractQuery(
          process.env.NEXT_PUBLIC_LOTTERY_ADDRESS_V2,
          {
            get_poll: { poll_id: x },
          }
        );
        setPolls((prevPolls) => [...prevPolls, contractInfo]);
        console.log(contractInfo);
        this.pollData.push(contractInfo);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    fetchContractQuery();
  }, [fetchContractQuery]);

  return (
    <>
      <Head>
        <title>LoTerra</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <main tw="relative mt-16 lg:mt-24 pb-4">
          <div tw="">
            <div>
              <h1 tw="text-white text-4xl font-bold text-center pb-4">DAO</h1>
              <h2 tw="text-gray-400 text-center text-xl">
                Vote proposals and contribute to LoTerra ecosystem
              </h2>
            </div>
            <div tw="w-full text-white">
              <div css={bgStyles}>
                {polls.map((poll, index) => (
                  <>
                    <h3>{poll.description}</h3>
                  </>
                ))}
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
