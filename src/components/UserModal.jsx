import React, {useState, useEffect, useMemo, useCallback} from "react";
import { X, Ticket,UserCircle, Info, TwitterLogo, TelegramLogo, WhatsappLogo, ArrowCircleLeft, ArrowCircleRight } from 'phosphor-react'
import {LCDClient, MsgExecuteContract, StdFee, WasmAPI} from "@terra-money/terra.js";
import {useStore} from "../store";
import SocialShare from './SocialShare'
import PriceLoader from "./PriceLoader";

let useConnectedWallet = {}
if (typeof document !== 'undefined') {
    useConnectedWallet = require('@terra-money/wallet-provider').useConnectedWallet
}

export default function UserModal(props){
    const [result, setResult] = useState("");
    const [claimed, setClaimed] = useState(false);
    const [ticketLoad, setTicketLoad] = useState();
    const {state, dispatch} = useStore();    

    let connectedWallet = ""
    if (typeof document !== 'undefined') {
        connectedWallet = useConnectedWallet()
    }

    const { open, toggleModal } = props;

    const isPlayer = state.allPlayers.includes(connectedWallet.walletAddress);
    const isWinner = state.allWinners.includes(connectedWallet.walletAddress);
    
    const timeStampHalf = (state.config.block_time_play * 1000) - (state.config.every_block_time_play / 2);
    const addToGas = 5300
    const obj = new StdFee(300_000, { uusd: 273600 + addToGas })
    function claim(){
        const msg = new MsgExecuteContract(
            connectedWallet.walletAddress,
            state.loterraContractAddress,
            {
                claim: {},
            })

        connectedWallet.post({
            msgs: [msg],
            fee: obj
            // gasPrices: obj.gasPrices(),
            // gasAdjustment: 1.5,
        }).then(e => {
            if (e.success) {
                setResult(`Claim success, please verify transaction on the blockchain explorer https://finder.terra.money/columbus-4/tx/${e.result.txhash}`)
                setClaimed(true)
            }
            else{
                console.log(e)
            }
        }).catch(e =>{
            console.log(e.message)
            setResult(e.message)
        })
    }

    async function lotteryCombinations(type){
        setTicketLoad(true)
        try {       
        const api = new WasmAPI(state.lcd_client.apiRequester);
        let id = parseInt(state.historicalTicketLotteryId == 0 ? state.currentLotteryId : state.historicalTicketLotteryId);
        if(type == 'prev' && id !== 1){                        
                id = id - 1            
        } 
        if(type == 'next' && state.historicalTicketLotteryId < state.currentLotteryId && state.historicalTicketLotteryId !== 0) {                  
                id = id + 1            
        }
        if(type == 'current'){
            id = state.currentLotteryId;
        }
        console.log(id)
        dispatch({type: "setHistoricalTicketLotteryId", message: id})

        const combinations = await api.contractQuery(
            state.loterraContractAddress,
            {
                combination: { lottery_id: id, address: state.wallet.walletAddress},
            }
        );
        console.log(combinations)
        dispatch({type: "setAllCombinations", message: combinations})
        setTicketLoad(false)
        }catch (e) {
            console.log(e,'no tickets found')
            dispatch({type: "setAllCombinations", message: []})
            setTicketLoad(false)
        }

    }
    
    // function collect(){
    //     const msg = new MsgExecuteContract(
    //         connectedWallet.walletAddress,
    //         state.loterraContractAddress,
    //         {
    //             collect: {},
    //         })

    //     connectedWallet.post({
    //         msgs: [msg],
    //         fee: obj
    //         // gasPrices: obj.gasPrices(),
    //         // gasAdjustment: 1.5,
    //     }).then(e => {
    //         if (e.success) {
    //             setResult("Collect success")
    //         }
    //         else{
    //             console.log(e)
    //         }
    //         console.log(e)
    //     }).catch(e =>{
    //         console.log(e.message)
    //         setResult(e.message)
    //     })
    // }
    return(
        <>
        <div className={open ? 'usermodal show' : 'usermodal'}>
            <button className="toggle" onClick={() => toggleModal()}><X size={48} /></button>
            <div className="usermodal_content">
                <div className="row">
                    { connectedWallet && connectedWallet.walletAddress &&
                        (
                            <>
                                <div className="col-12 mb-2 text-center start">
                                    <UserCircle size={100} />
                                </div>

                                <div className="col-12 text-center claim">
                                    <h4 className="mb-2">
                                        Your Lottery Tickets
                                        {state.historicalTicketLotteryId !== 0 && state.historicalTicketLotteryId !== state.currentLotteryId &&
                                            <small className="d-block" style={{fontSize:'14px', color:'#ff36ff'}}>Tickets from Lottery <strong>#{state.historicalTicketLotteryId}</strong></small>
                                        }
                                    </h4>
                                    
                                    <div className="btn-group w-100">
                                        <button className="btn btn-default" disabled={state.historicalTicketLotteryId == 1 ? true : false} onClick={() => lotteryCombinations('prev')}>
                                            <ArrowCircleLeft size={24} />
                                        </button>
                                        <button className="btn btn-default" disabled={state.historicalTicketLotteryId == 0 || state.historicalTicketLotteryId == state.currentLotteryId  ? true : false} onClick={() => lotteryCombinations('current')}>
                                            Current
                                        </button>
                                        <button className="btn btn-default" disabled={state.historicalTicketLotteryId == 0 || state.historicalTicketLotteryId == state.currentLotteryId ? true : false} onClick={() => lotteryCombinations('next')}>
                                            <ArrowCircleRight size={24} />
                                        </button>
                                    </div>
                                    <ul className="list-group text-left">
                                        {ticketLoad ? 
                                            (<PriceLoader/>)
                                        :
                                        (state.allCombinations.combination ? state.allCombinations.combination.map((element, i) =>
                                            <li key={i} className="list-group-item"><Ticket size={18} color={'#20FF93'} />{element}</li>):
                                            <li className="list-group-item"><Ticket size={18} color={'#20FF93'} />No tickets found</li>
                                        )}
                                    </ul>
                                </div>

                                <div className="col-12 text-center mt-4 claim">
                                <span className="info text-start" style={{color:'#FF36FF', borderColor:'#FF36FF'}}>
                                                    <Info size={14} weight="fill" className="me-1" style={{position:'relative',top:'-2px'}} /><strong>How to Claim and Collect?</strong><br/>
                                                    Our LoTerra BOT will claim and collect automatically, afterwards the BOT deposits winning prizes to your wallet. This process takes up to max 2 days from draw.
                                                </span>
                                    {/* <h4>Claim & Collect</h4>
                                    <p>Our LoTerra BOT will claim automatically and deposit winning prizes in your wallet.</p> */}
                                    {/* {
                                       1==1 ?
                                            <button className="btn btn-special w-100 mb-3" style={{boxShadow:'none'}} onClick={() => claim()} >Claim</button> :
                                            <button className="btn btn-special w-100 mb-3" style={{boxShadow:'none'}} disabled>Claim closed</button>
                                    }
                                    {
                                       1 == 1 ?
                                            <button className="btn btn-special-green w-100 mb-3" style={{boxShadow:'none'}} onClick={() => collect()}>Collect</button> :
                                            <button className="btn btn-special-green w-100 mb-3" style={{boxShadow:'none'}} disabled>Collect closed</button>
                                    }
                                    {result} */}
                                </div>
                                <div className="col-12 mt-3">
                                    <SocialShare/>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
        <div className={open ? 'backdrop show' : 'backdrop'} onClick={() => toggleModal()}></div>
        </>
    )
}
