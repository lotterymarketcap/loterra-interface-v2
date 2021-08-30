import React, {useState, useEffect, useMemo, useCallback} from "react";
import { X, Ticket,UserCircle, Info, TwitterLogo, TelegramLogo, WhatsappLogo } from 'phosphor-react'
import {LCDClient, MsgExecuteContract, StdFee, WasmAPI} from "@terra-money/terra.js";
import {useStore} from "../store";
import SocialShare from './SocialShare'

let useConnectedWallet = {}
if (typeof document !== 'undefined') {
    useConnectedWallet = require('@terra-money/wallet-provider').useConnectedWallet
}

export default function UserModal(props){
    const [result, setResult] = useState("");
    const [claimed, setClaimed] = useState(false);
    let connectedWallet = ""
    if (typeof document !== 'undefined') {
        connectedWallet = useConnectedWallet()
    }

    const { open, toggleModal } = props;
    const store = useStore();

    const isPlayer = store.state.allPlayers.includes(connectedWallet.walletAddress);
    const isWinner = store.state.allWinners.includes(connectedWallet.walletAddress);
    
    const timeStampHalf = (store.state.config.block_time_play * 1000) - (store.state.config.every_block_time_play / 2);
    const addToGas = 5300
    const obj = new StdFee(300_000, { uusd: 273600 + addToGas })
    function claim(){
        const msg = new MsgExecuteContract(
            connectedWallet.walletAddress,
            store.state.loterraContractAddress,
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
    function collect(){
        const msg = new MsgExecuteContract(
            connectedWallet.walletAddress,
            store.state.loterraContractAddress,
            {
                collect: {},
            })

        connectedWallet.post({
            msgs: [msg],
            fee: obj
            // gasPrices: obj.gasPrices(),
            // gasAdjustment: 1.5,
        }).then(e => {
            if (e.success) {
                setResult("Collect success")
            }
            else{
                console.log(e)
            }
            console.log(e)
        }).catch(e =>{
            console.log(e.message)
            setResult(e.message)
        })
    }
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
                                    <h4 className="mb-2">Current Lottery Tickets</h4>
                                    <ul className="list-group text-left">
                                        {store.state.allCombinations.combination ? store.state.allCombinations.combination.map((element, i) =>
                                            <li key={i} className="list-group-item"><Ticket size={18} color={'#20FF93'} />{element}</li>):
                                            <li className="list-group-item"><Ticket size={18} color={'#20FF93'} />No tickets found</li>
                                        }
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
