import React, { useState, useEffect } from 'react'
import {
    LCDClient,
    MsgExecuteContract,
    StdFee,
    WasmAPI,
} from '@terra-money/terra.js'
import { useStore } from '../store'
import { TwitterLogo, TelegramLogo, Files } from 'phosphor-react'

export default function ApyStats() {
    const { state, dispatch } = useStore()

    const [winnerData, setWinnerData] = useState([])
    const [jackpotData, setJackpotData] = useState([])

    const timer = (ms) => new Promise((res) => setTimeout(res, ms))

    async function getAverageData() {
        const tmpJackpotData = []
        const tmpWinnerData = []
        const api = new WasmAPI(state.lcd_client.apiRequester)

        for (
            let index = state.currentLotteryId - 8;
            index < state.currentLotteryId;
            index++
        ) {
            for (let i = 2; i < 5; i++) {
                const contractWinnersInfo = await api.contractQuery(
                    state.loterraContractAddress,
                    {
                        count_winner: { lottery_id: index, rank: i },
                    }
                )

                await tmpWinnerData.push({
                    rank: i,
                    lottery_id: index,
                    data: { contractWinnersInfo },
                })
                await timer(250)
            }

            const contractJackpotInfo = await api.contractQuery(
                state.loterraContractAddress,
                {
                    jackpot: { lottery_id: index },
                }
            )

            await tmpJackpotData.push({
                lottery_id: index,
                jackpot: contractJackpotInfo,
            })
            await timer(500) // then the created Promise can be awaited
        }
        setJackpotData(tmpJackpotData)
        setWinnerData(tmpWinnerData)
        //console.log(tmpWinnerData,tmpJackpotData)
        //Calc function
        const tmpData = tmpJackpotData.map((obj, i) => {
            const winners = []
            //Get total winner prizes
            tmpWinnerData.map((o, i) => {
                if (o.lottery_id == obj.lottery_id) {
                    if (parseInt(o.data.contractWinnersInfo) > 0) {
                        winners.push({
                            rank: o.rank,
                            winners: o.data.contractWinnersInfo,
                        })
                    }
                }
            })
            return {
                jackpot_id: obj.lottery_id,
                jackpot: obj.jackpot,
                winners: winners,
            }
        })
        //console.log(tmpData)

        function getPrizePerRank(nr) {
            let rank = nr - 1
            return numeral(
                (state.config.prize_per_rank[rank] * parseInt(jackpot)) / 100
            ).format('0,0.00')
        }

        //Make final calc
        tmpData.map((obj, i) => {
            const jackpotPrice = parseInt(obj.jackpot / 1000)

            //console.log(jackpotPrice)
        })
    }

    // getAverageData()

    useEffect(() => {
        getAverageData()
    }, [])
    return (
        <div className="text-center">
            {jackpotData.length <= 0 && <p>Loading</p>}
            {jackpotData.length > 0 && <p>Data loaded</p>}
        </div>
    )
}
