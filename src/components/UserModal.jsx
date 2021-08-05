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
                                        <li className="list-group-item"><Ticket size={18} color={'#20FF93'} />abcdef</li>
                                        <li className="list-group-item"><Ticket size={18} color={'#20FF93'} />abcdef</li>
                                        <li className="list-group-item"><Ticket size={18} color={'#20FF93'} />abcdef</li>
                                        <li className="list-group-item"><Ticket size={18} color={'#20FF93'} />abcdef</li>
                                        <li className="list-group-item"><Ticket size={18} color={'#20FF93'} />abcdef</li>
                                        <li className="list-group-item"><Ticket size={18} color={'#20FF93'} />abcdef</li>
                                        <li className="list-group-item"><Ticket size={18} color={'#20FF93'} />abcdef</li>
                                        <li className="list-group-item"><Ticket size={18} color={'#20FF93'} />abcdef</li>
                                        <li className="list-group-item"><Ticket size={18} color={'#20FF93'} />abcdef</li>
                                    </ul>
                                </div>

                                <div className="col-12 text-center mt-4 claim">
                                    <h4>Claim & Collect</h4>
                                    <p>By clicking this button loterra will check if you won any prizes, if you did we will claim them automatically for you</p>
                                    <button className="btn btn-special w-100 mb-3" style={{boxShadow:'none'}}>Claim</button>
                                    <button className="btn btn-special-green w-100 mb-3" style={{boxShadow:'none'}}>Collect</button>
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