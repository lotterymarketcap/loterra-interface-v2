import React, {useState, useEffect, useMemo} from "react";

import {LCDClient, WasmAPI} from "@terra-money/terra.js";
import {
  useWallet,
  WalletStatus,
  useConnectedWallet,
  ConnectType,
} from "@terra-money/wallet-provider";

import { Wallet, CaretRight, UserCircle } from 'phosphor-react'
import numeral from "numeral"
import UserModal from "./UserModal";
import {useStore} from "../store";
import { Link } from "@reach/router";
// let useWallet = {}
// if (typeof document !== 'undefined') {
//     useWallet = require('@terra-money/wallet-provider').useWallet
// }
/*const Modal = {
    position: "absolute",
    width: "100%",
    height:"100%",
    left: "0",
    top: "0",
}
const Dialog = {
    position: "absolute",
    right: "100px",
    top: "120px",
    width: "300px",
    display: "flex",
    justifyContent: "center",
    flexDirection:"column",

} */
const DialogButton = {
    margin: "10px 20px 10px 20px"
}
export default function ConnectWallet(){
    let connectedWallet = "";
    const [isDisplayDialog, setIsDisplayDialog] = useState(false);
    const [isModal, setIsModal] = useState(false);
    const [bank, setBank] = useState();
    const [connected, setConnected]= useState(false);
    const store = useStore();
    let wallet = ""
    if (typeof document !== 'undefined') {
        wallet = useWallet();
        connectedWallet = useConnectedWallet()
    }
    const lcd = useMemo(() => {

        if (!connectedWallet) {
          return null;
        }
    
        return new LCDClient({
          URL: connectedWallet.network.lcd,
          chainID: connectedWallet.network.chainID,
        });
      }, [connectedWallet]);
    





    //const installChrome = useInstallChromeExtension();
    //const connectedWallet = ConnectedWallet ? useConnectedWallet() : undefined;


    function display(){
        // active or disable dialog
        setIsDisplayDialog(!isDisplayDialog)
    }
    function closeModal() {
        setIsDisplayDialog(false)
    }
    function connectTo(to) {
        if (to == "extension") {
            wallet.connect(wallet.availableConnectTypes[1])
        }
        else if (to == "mobile") {
            wallet.connect(wallet.availableConnectTypes[2])
        }else if (to == "disconnect"){
            wallet.disconnect()
        }
        setConnected(!connected)
        setIsDisplayDialog(false)
    }

    async function contactBalance(){

            if (connectedWallet && connectedWallet.walletAddress && lcd) {
                //   setShowConnectOptions(false);
                let coins
                let token
                try {
                    coins = await lcd.bank.balance(connectedWallet.walletAddress);
                    const api = new WasmAPI(lcd.apiRequester);
                    const combinations = await api.contractQuery(
                        store.state.loterraContractAddress,
                        {
                            combination: { lottery_id: store.state.config.lottery_counter, address: connectedWallet.walletAddress},
                        }
                    );
                    store.dispatch({type: "setAllCombinations", message: combinations})

                }catch (e) {
                    console.log(e)
                }

                let uusd = coins.filter((c) => {
                    return c.denom === "uusd";
                });
                let ust = parseInt(uusd) / 1000000;
                setBank(numeral(ust).format("0,0.00"));
                // connectTo("extension")
                setConnected(true)
            } else {
                setBank(null);
            }
    }

 

    useEffect(() => {
            contactBalance()
            console.log(connectedWallet)
    }, [connectedWallet, lcd, store.state.config]);

    function renderDialog(){
        if (isDisplayDialog){
            return(
                <div /*style={Modal}*/ onClick={() => closeModal()}>
                    <div /*style={Dialog}*/ className="card-glass">
                        <button onClick={() => connectTo("extension")} className="button-pink-outline" style={DialogButton}>Terra Station (extension)</button>
                        <button onClick={() => connectTo("mobile")} className="button-pink-outline" style={DialogButton}>Terra Station (mobile)</button>
                    </div>
                </div>
            )
        }
    }
    
    function returnBank(){
        return(
            <>
            <Wallet size={21} color="#0F0038" style={{display:'inline-block', marginTop:'-3px'}} /> {bank} <span className="text-sm">UST</span>
            </>
        )
    }

    const [scrolled,setScrolled]= React.useState(false);
    const handleScroll=() => {
        const offset=window.scrollY;
        if(offset > 25 ){
          setScrolled(true);
        }
        else{
          setScrolled(false);
        }
      }
    
      useEffect(() => {
        window.addEventListener('scroll',handleScroll)
      })

    return(
        <div className={scrolled ? 'navbar navbar-expand p-2 p-md-3 sticky' : 'navbar navbar-expand p-2 p-md-3'}>
        <div className="container-fluid">
            <a className="navbar-brand"><img src="logo.png"/> <span>LOTERRA</span></a>
            {/* <nav className="navbar-nav main-nav me-auto">                
                <li className="nav-item"><a href="/" className="nav-link">Lottery</a></li>
                <li className="nav-item"><a href="/staking" className="nav-link">Staking</a></li>
                <li className="nav-item"><a href="/dao" className="nav-link">DAO</a></li>
            </nav> */}
            <div className="navbar-nav ms-auto">
                {!connected && (
                    <>                       
                        <div className="btn-group">
                            <button
                                className="btn btn-green nav-item dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <Wallet
                                    size={18}
                                    style={{
                                        marginTop: '-4px',
                                        marginRight: '4px',
                                    }}
                                />
                                Connect
                            </button>
                            <ul
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="dropdownMenuButton1"
                            >
                                <button
                                    onClick={() => connectTo('extension')}
                                    className="dropdown-item"
                                >
                                    <CaretRight
                                        size={16}
                                        style={{ marginTop: '-4px' }}
                                    />{' '}
                                    Terra Station (extension/mobile)
                                </button>
                                <button
                                    onClick={() => connectTo('mobile')}
                                    className="dropdown-item"
                                >
                                    <CaretRight
                                        size={16}
                                        style={{ marginTop: '-4px' }}
                                    />{' '}
                                    Terra Station (mobile for desktop)
                                </button>
                            </ul>
                        </div>
                    </>
                )}
                {connected && (
                    <>
                    <button className="btn btn-default nav-item me-2" onClick={() => setIsModal(!isModal)}><UserCircle size={26}
                    style={{
                        marginTop: '-4px'
                    }} /></button>                        
                    <button
                        onClick={() => connectTo('disconnect')}
                        className="btn btn-green nav-item"
                    >
                        {connected ? returnBank() : ''}
                    </button>
                    </>
                )}
            </div>
        </div>

        {/*<button onClick={() => display()}>Connect Wallet</button>
        {renderDialog()}*/}
        {connected &&
            <UserModal open={isModal} toggleModal={() => setIsModal(!isModal)} connetedWallet={connectedWallet}/>
        }
    </div>

    )
}