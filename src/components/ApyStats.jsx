import React, {useState, useEffect} from "react";
import {LCDClient, MsgExecuteContract, StdFee, WasmAPI} from "@terra-money/terra.js"
import {useStore} from "../store";
import { TwitterLogo,TelegramLogo, Files } from "phosphor-react";

export default function ApyStats(){    
    const {state, dispatch} = useStore();

    const [winnerData,setWinnerData] = useState([]);
    const [jackpotData,setJackpotData] = useState([])



    async function getAverageData(){
        const tmpJackpotData = [];
        const tmpWinnerData = [];
        const terra = new LCDClient({
            URL: "https://lcd.terra.dev/",
            chainID: "columbus-4",
          });
          const api = new WasmAPI(terra.apiRequester);      
          
          for (let index = state.currentLotteryId - 8; index < state.currentLotteryId; index++) {
            
            for (let i = 1; i < 5; i++) {               
                const contractWinnersInfo = await api.contractQuery(
                    state.loterraContractAddress,
                  {
                    count_winner: { lottery_id: index, rank: i  },
                  }
                );
             
                tmpWinnerData.push({rank: i, lottery_id: index, data:{contractWinnersInfo}})
            }
            
            

            const contractJackpotInfo = await api.contractQuery(
                state.loterraContractAddress,
              {
                jackpot: { lottery_id: index  },
              }
            );
         
            tmpJackpotData.push({lottery_id: index, jackpot: contractJackpotInfo})
              
          }
          setJackpotData(tmpJackpotData)
          setWinnerData(tmpWinnerData)
          console.log(tmpWinnerData,tmpJackpotData)
    }

    getAverageData()
    
    // useEffect(() => {
    //     getAverageData();
       
    //   }, [getAverageData]);
    return (       
       <div className="text-center">
           { jackpotData.length <= 0 &&
             <p>Loading</p>
           }
           { jackpotData.length > 0 &&
             <p>Data loaded</p>
           }
       </div>
    )
}