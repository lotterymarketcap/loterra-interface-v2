import Head from "next/head";
import tw, { css } from "twin.macro";
import { TicketIcon, UsersIcon } from "@heroicons/react/outline";

import Layout from "../components/Layout";
import Button from "../components/Button";
import Jackpot from "../components/Jackpot";
import StatCard from "../components/StatCard";
import Countdown from "../components/Countdown";

const backgroundStyles = css`
  ${tw`w-full h-full absolute z-10 pointer-events-none object-cover`}
`;

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
            <div tw="w-full overflow-x-hidden relative">
              <div tw="px-4 sm:px-6 lg:px-8 z-10">
                <Jackpot label="Jackpot" amount={126257.94} />
                <div tw="flex justify-center mt-4">
                  <StatCard label="Tickets sold" amount={3426366}>
                    <div tw="h-16 w-16 rounded-full text-green-light">
                      <TicketIcon />
                    </div>
                  </StatCard>
                  <StatCard label="Players" amount={26366455}>
                    <div tw="h-14 w-14 rounded-full text-green-light">
                      <UsersIcon />
                    </div>
                  </StatCard>
                </div>
                <div tw="my-12 flex justify-center">
                  <Countdown />
                </div>
                <div tw="flex justify-center">
                  <Button label="Buy tickets" />
                </div>
              </div>
            </div>
            <div css={backgroundStyles}>
              <img
                src="/assets/hero-wave.svg"
                tw="w-full h-screen absolute bottom-12 object-cover"
              />
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
