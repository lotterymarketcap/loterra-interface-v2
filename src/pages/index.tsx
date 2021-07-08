import Head from "next/head";
import tw, { css } from "twin.macro";
import { TicketIcon, UsersIcon } from "@heroicons/react/outline";

import Layout from "../components/Layout";
import Button from "../components/Button";
import Jackpot from "../components/Jackpot";
import StatCard from "../components/StatCard";
import Countdown from "../components/Countdown";

export default function Home() {
  return (
    <>
      <Head>
        <title>LoTerra</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <main tw="relative mt-16 lg:mt-24 px-4 sm:px-6 lg:px-8 pb-4">
          <div tw="flex justify-center">
            <div tw="w-full sm:w-96">
              <Jackpot label="Jackpot" amount={126257.94} />
              <div tw="grid gap-4 grid-cols-2">
                <StatCard label="Tickets sold" amount={3426366}>
                  <div tw="h-10 w-10 rounded-full text-green-light">
                    <TicketIcon />
                  </div>
                </StatCard>
                <StatCard label="Players" amount={26366455}>
                  <div tw="h-9 w-9 rounded-full text-green-light">
                    <UsersIcon />
                  </div>
                </StatCard>
              </div>
              <div tw="my-12">
                <Countdown />
              </div>
              <div tw="flex justify-center">
                <Button label="Buy tickets" />
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
