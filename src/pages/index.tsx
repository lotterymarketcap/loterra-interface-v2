import Head from "next/head";
import tw, { css } from "twin.macro";
import { TicketIcon, UsersIcon } from "@heroicons/react/outline";
import { LCDClient, WasmAPI } from "@terra-money/terra.js";
import { useEffect, useState, useCallback } from "react";
import { useRecoilState } from "recoil";

import Layout from "../components/Layout";
import Button from "../components/Button";
import Jackpot from "../components/Jackpot";
import StatCard from "../components/StatCard";
import Countdown from "../components/Countdown";
import TicketSelect from "../components/TicketSelect/TicketSelect";

import { ticketSelectDisplayState } from "../state/dialog";

const backgroundStyles = css`
  ${tw`w-full h-full absolute z-10 pointer-events-none object-cover`}
`;

export default function Home() {
  const [openTicketSelect, setOpenTicketSelect] = useRecoilState(
    ticketSelectDisplayState
  );

  const [jackpot, setJackpot] = useState(0);
  const [tickets, setTickets] = useState(0);
  const [players, setPlayers] = useState(0);
  const [expiryTimestamp, setExpiryTimestamp] = useState(
    1
  ); /** default timestamp need to be > 1 */

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

      setExpiryTimestamp(parseInt(contractConfigInfo.block_time_play * 1000));

      const contractJackpotInfo = await api.contractQuery(
        process.env.NEXT_PUBLIC_LOTTERY_ADDRESS_V2,
        {
          jackpot: { lottery_id: contractConfigInfo.lottery_counter - 1 },
        }
      );
      setJackpot(parseInt(contractJackpotInfo) / 1000000);

      const contractTicketsInfo = await api.contractQuery(
        process.env.NEXT_PUBLIC_LOTTERY_ADDRESS_V2,
        {
          count_ticket: { lottery_id: contractConfigInfo.lottery_counter - 1 },
        }
      );
      setTickets(parseInt(contractTicketsInfo));

      const contractPlayersInfo = await api.contractQuery(
        process.env.NEXT_PUBLIC_LOTTERY_ADDRESS_V2,
        {
          count_player: { lottery_id: contractConfigInfo.lottery_counter - 1 },
        }
      );
      setPlayers(parseInt(contractPlayersInfo));
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
          <div tw="flex justify-center">
            <div tw="w-full overflow-x-hidden relative">
              <div tw="px-4 sm:px-6 lg:px-8 z-10">
                <Jackpot label="Jackpot" amount={jackpot} />
                <div tw="flex justify-center mt-4">
                  <StatCard label="Tickets sold" amount={tickets}>
                    <div tw="h-16 w-16 rounded-full text-green-light">
                      <TicketIcon />
                    </div>
                  </StatCard>
                  <StatCard label="Players" amount={players}>
                    <div tw="h-14 w-14 rounded-full text-green-light">
                      <UsersIcon />
                    </div>
                  </StatCard>
                </div>
                <div tw="my-12 flex justify-center">
                  <Countdown expiryTimestamp={expiryTimestamp} />
                </div>
                <div tw="flex justify-center">
                  <Button
                    label="Buy tickets"
                    onClick={() => {
                      setOpenTicketSelect(true);
                    }}
                  />
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
          <TicketSelect />
        </main>
      </Layout>
    </>
  );
}
