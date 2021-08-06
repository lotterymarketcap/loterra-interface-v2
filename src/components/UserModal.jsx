import React, {useState, useEffect, useMemo, useCallback} from "react";
import { X, Ticket,UserCircle } from 'phosphor-react'
import {LCDClient, WasmAPI} from "@terra-money/terra.js";
import {useStore} from "../store";
let useConnectedWallet = {}
if (typeof document !== 'undefined') {
    useConnectedWallet = require('@terra-money/wallet-provider').useConnectedWallet
}

export default function UserModal(props){

    let connectedWallet = ""
    if (typeof document !== 'undefined') {
        connectedWallet = useConnectedWallet()
    }

    const { open, toggleModal } = props;
    const store = useStore();
    const isPlayer = store.state.allPlayers.includes(connectedWallet.walletAddress);
    const isWinner = store.state.allWinners.includes(connectedWallet.walletAddress);
    const timeStampHalf = (store.state.config.block_time_play * 1000) - (store.state.config.every_block_time_play / 2);

    console.log(store.state.allCombinations)

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
                                    <h4 className="mb-2">Current lottery tickets</h4>
                                    <ul className="list-group text-left" style={{height:'250px', overflowY:'scroll'}}>
                                        {store.state.allCombinations.combination ? store.state.allCombinations.combination.map((element, i) =>
                                            <li key={i} className="list-group-item"><Ticket size={18} color={'#20FF93'} />{element}</li>):
                                            <li className="list-group-item"><Ticket size={18} color={'#20FF93'} />No ticket found</li>
                                        }
                                    </ul>
                                </div>

                                <div className="col-12 text-center mt-4 claim">
                                    <h4>Claim & Collect</h4>
                                    <p>By clicking this button LoTerra will check if you won any prizes, if you did we will claim them automatically for you</p>
                                    {
                                        isPlayer && Date.now() < timeStampHalf && !isWinner ?
                                            <button className="btn btn-special w-100 mb-3" style={{boxShadow:'none'}} onClick={() => claim()} >Claim</button> :
                                            <button className="btn btn-special w-100 mb-3" style={{boxShadow:'none'}} disabled>Claim closed</button>
                                    }
                                    {
                                        isWinner && Date.now() > timeStampHalf ?
                                            <button className="btn btn-special-green w-100 mb-3" style={{boxShadow:'none'}} onClick={() => collect()}>Collect</button> :
                                            <button className="btn btn-special-green w-100 mb-3" style={{boxShadow:'none'}} disabled>Collect closed</button>
                                    }

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