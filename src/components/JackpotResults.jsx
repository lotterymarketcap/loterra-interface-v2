import React, {useState} from "react";
import { useStore } from "../store";
import numeral from "numeral";
import {LCDClient, MsgExecuteContract, StdFee, WasmAPI, BankAPI} from "@terra-money/terra.js";

import { Trophy, ArrowCircleLeft, ArrowCircleRight } from "phosphor-react";
import PriceLoader from "./PriceLoader";
import WinnerRow from "./WinnerRow";

const loterra_contract_address = "terra1q2k29wwcz055q4ftx4eucsq6tg9wtulprjg75w"

export default function JackpotResults(){    
    const {state, dispatch} = useStore();  
    
    function getPrizePerRank(nr){
        let rank = nr-1;
        return numeral(
          (state.config.prize_rank_winner_percentage[rank] * parseInt(state.historicalJackpot)) / 100
        ).format('0,0.00')
    }
    function getPrizePerRankGross(nr){
        let rank = nr-1;
        return numeral(
            (state.config.prize_rank_winner_percentage[rank] * parseInt(state.historicalJackpot) - (state.config.prize_rank_winner_percentage[rank] * parseInt(state.historicalJackpot) * state.config.token_holder_percentage_fee_reward / 100)) / 100
        ).format('0,0.00')
    }
    function getPrizePerRankTax(nr){
        let rank = nr-1;
        return numeral(
            (state.config.prize_rank_winner_percentage[rank] * parseInt(state.historicalJackpot) / 100) * (state.config.token_holder_percentage_fee_reward / 100)
        ).format('0,0.00')
    }

    async function winnerData(type){
   
        try {       
        const api = new WasmAPI(state.lcd_client.apiRequester);
        let id = parseInt(state.historicalJackpotLotteryId == 0 ? state.currentLotteryId - 1 : state.historicalJackpotLotteryId);
        if(type == 'prev' && id !== 1){                        
                id = id - 1            
        } 
        if(type == 'next' && state.historicalJackpotLotteryId < state.currentLotteryId && state.historicalJackpotLotteryId !== 0) {                  
                id = id + 1            
        }
        if(type == 'current'){
            id = state.currentLotteryId - 1;
        }
        //console.log(id)
        dispatch({type: "setHistoricalJackpotLotteryId", message: id})

        const winningCombination = await api.contractQuery(
            loterra_contract_address,
          {
            winning_combination: { lottery_id: id  },
          }
        );
        dispatch({type: "setWinningCombination", message: winningCombination})

        const {winners} = await api.contractQuery(loterra_contract_address, {
            winner:{
                lottery_id: id
            }
        });
        dispatch({type: "setAllWinners", message: winners})

        const jackpotInfo = await api.contractQuery(
            loterra_contract_address,
            {
                jackpot: {
                    lottery_id: id
                }
            }
        );

      

        dispatch({type: "setHistoricalJackpot", message: parseInt(jackpotInfo) / 1000000})


        }catch (e) {
            console.log(e,'no found')
           
        }
    }

    return (
        <div className="container" style={{marginTop:'7rem'}}>
        <div className="card lota-card">
          <div className="card-header text-center">
            <div className="card-header-icon">
              <Trophy size={90} color="#20FF93"/>
            </div>
            <h3>
            Latest Jackpot Results
            {state.historicalJackpotLotteryId !== 0 && state.historicalJackpotLotteryId !== state.currentLotteryId - 1 &&
                <small className="d-block" style={{fontSize:'14px', color:'#ff36ff'}}>Results from Lottery <strong>#{state.historicalJackpotLotteryId}</strong></small>
            }
            </h3>
            <div className="btn-group w-100">
                <button className="btn btn-default" disabled={state.historicalJackpotLotteryId == 1 ? true : false} onClick={() => winnerData('prev')}>
                    <ArrowCircleLeft size={24} />
                </button>
                <button className="btn btn-default" disabled={state.historicalJackpotLotteryId == 0 || state.historicalJackpotLotteryId == state.currentLotteryId - 1  ? true : false} onClick={() => winnerData('current')}>
                    Latest
                </button>
                <button className="btn btn-default" disabled={state.historicalJackpotLotteryId == 0 || state.historicalJackpotLotteryId == state.currentLotteryId - 1 ? true : false} onClick={() => winnerData('next')}>
                    <ArrowCircleRight size={24} />
                </button>
            </div>
          </div>
          <div className="card-body">
            <div className="w-100 text-center latest-combination">
            <h4 style={{color:'#ff36ff'}}>Winning combination</h4>
            <p>{state.winningCombination ? state.winningCombination.split('').map(obj => {return(<span>{obj}</span>)}) : <PriceLoader/> }</p>
            </div>
          <h4 className="mt-4">Rewards</h4>
          <div className="table-responsive">
            <table className="table text-white mb-3">
              <thead>
                <tr>
                  <th>Ranks</th>
                  <th>Symbols</th>
                  <th>Gross prizes</th>
                  <th>Net prizes</th>
                  <th>LOTA tax</th>
                </tr>
              </thead>
              { state.config.prize_rank_winner_percentage &&
                <tbody>
                <tr>
                <th scope="row" className="text-white">#1</th>
                  <td style={{color:'#FF36FF',minWidth:'100px'}}>6 Symbols</td>
                  <td>{getPrizePerRank(1)}<span>UST</span></td>
                  <td>{getPrizePerRankGross(1)}<span>UST</span></td>
                  <td>{getPrizePerRankTax(1)}<span>UST</span></td>
                </tr>
                <tr>
                <th scope="row" className="text-white">#2</th>
                  <td style={{color:'#FF36FF',minWidth:'100px'}}>5 Symbols</td>
                  <td>{getPrizePerRank(2)}</td>
                  <td>{getPrizePerRankGross(2)}<span>UST</span></td>
                  <td>{getPrizePerRankTax(2)}<span>UST</span></td>
                </tr>
                <tr>
                <th scope="row" className="text-white">#3</th>
                  <td style={{color:'#FF36FF',minWidth:'100px'}}>4 Symbols</td>
                  <td>{getPrizePerRank(3)}<span>UST</span></td>
                  <td>{getPrizePerRankGross(3)}<span>UST</span></td>
                  <td>{getPrizePerRankTax(3)}<span>UST</span></td>
                </tr>
                <tr>
                  <th scope="row" className="text-white">#4</th>
                  <td style={{color:'#FF36FF',minWidth:'100px'}}>3 Symbols</td>
                  <td>{getPrizePerRank(4)}<span>UST</span></td>
                  <td>{getPrizePerRankGross(4)}<span>UST</span></td>
                  <td>{getPrizePerRankTax(4)}<span>UST</span></td>
                </tr>
              </tbody>
              }
            </table>
            </div>
            <h4 className="mt-4">Winners</h4>
            <div className="table-responsive">
            <table className="table text-white winners-table">
                <thead>
                  <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Address</th>
                  <th scope="col">Collected</th>
                  </tr>
                </thead>
                <tbody>
                  {state.allWinners && state.allWinners.map((obj,key) => {
                    return (
                      <WinnerRow a={key} obj={obj}/>                                      
                    )
                  })}
                </tbody>
            </table>
            </div>
          </div>
        </div>

 </div> 
    )
}