import React, {useState, useEffect, useMemo, useRef} from "react";
import axios from "axios"
import {LCDClient, WasmAPI} from "@terra-money/terra.js";
import {
  useWallet,
  WalletStatus,
  useConnectedWallet,
  ConnectType,
} from "@terra-money/wallet-provider";

import { Wallet, CaretRight, UserCircle, Power, List,X, Ticket, Bank } from 'phosphor-react'
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
    const [sideNav, setSideNav] = useState(false);
    const [bank, setBank] = useState();
    const [connected, setConnected]= useState(false);
    const {state, dispatch} = useStore();    



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
    
  

      async function baseData(){
          const latestBlocks = await axios.get('https://lcd.terra.dev/blocks/latest')

          dispatch({type: "setBlockHeight", message: latestBlocks.data.block.header.height})
        //Get proposals and save to state   
        const terra = new LCDClient({
            URL: "https://lcd.terra.dev/",
            chainID: "columbus-4",
          });
          const api = new WasmAPI(terra.apiRequester);        
       

        const contractConfigInfo = await api.contractQuery(
            state.loterraContractAddress,
          {
            config: {},
          }
        );
        dispatch({type: "setCurrentLotteryId", message: contractConfigInfo.lottery_counter})
        dispatch({type: "setHolderPercentageFee", message: contractConfigInfo.token_holder_percentage_fee_reward})


        const contractDaoBalance = await api.contractQuery(
            state.loterraContractAddressCw20,
          {
              balance: {
                  address: state.loterraContractAddress
              }
          }
        )
          dispatch({type: "setDaoFunds", message: contractDaoBalance.balance})
          const contractLPLoterraBalance = await api.contractQuery(
              state.loterraContractAddressCw20,
              {
                  balance: {
                      address: state.loterraStakingLPAddress
                  }
              }
          )
          dispatch({type: "setStakingLoterraFunds", message: contractLPLoterraBalance.balance})
          const contractLPAlteredBalance = await api.contractQuery(
              state.loterraContractAddressCw20,
              {
                  balance: {
                      address: state.alteredStakingLPAddress
                  }
              }
          )
          dispatch({type: "setStakingAlteredFunds", message: contractLPAlteredBalance.balance})
          


        console.log('config',contractConfigInfo)

        let pollCount = contractConfigInfo.poll_count;
        console.log('count',pollCount)
        let allProposals = [];
        for (let index = 1; index < pollCount + 1; index++) {
            const proposal = await api.contractQuery(
                state.loterraContractAddress,
                {
                get_poll: { poll_id: index },
                }
        );
        proposal.nr = index;
        allProposals.push(proposal);
        console.log('single', proposal)
        }
        dispatch({type: "setAllProposals", message: allProposals})
        console.log('proposals',allProposals)

        const staking = await api.contractQuery(
            state.loterraStakingAddress,
          {
            state: {},
          }
        );
        dispatch({type: "setStaking", message: staking})
        console.log('staking',staking)

        const token_info = await api.contractQuery(
            state.loterraContractAddressCw20, 
            {
                token_info:{},
            }
        );
        dispatch({type: "setTokenInfo", message: token_info})

      const state_lp_staking = await api.contractQuery(state.loterraStakingLPAddress, {
          state:{}
      })
      dispatch({type: "setStateLPStaking", message: state_lp_staking})
      const pool_info = await api.contractQuery(state.loterraPoolAddress, {
          pool:{}
      })
      dispatch({type: "setPoolInfo", message: pool_info})

    }


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
            dispatch({type: "setWallet", message: {}})  
        }
        setConnected(!connected)
        setIsDisplayDialog(false)
    }

    async function contactBalance(){
       
            if (connectedWallet && connectedWallet.walletAddress && lcd) {
                //   setShowConnectOptions(false);
                dispatch({type: "setWallet", message: connectedWallet})    

                let coins
             
                let token
                try {
                    const api = new WasmAPI(lcd.apiRequester);
                    coins = await lcd.bank.balance(connectedWallet.walletAddress);

                    const contractConfigInfo = await api.contractQuery(
                        state.loterraContractAddress,
                      {
                        config: {},
                      }
                    );
                

                    
                    const holder = await api.contractQuery(
                        state.loterraStakingAddress,
                        {
                            holder: { address: connectedWallet.walletAddress },
                        }
                    );
                    dispatch({type: "setAllHolder", message: holder})    
                    console.log(holder)     

const holderAccruedRewards = await api.contractQuery(
                        state.loterraStakingAddress,
                        {
                            accrued_rewards: { address: connectedWallet.walletAddress },
                        }
                    );
                    dispatch({type: "setHolderAccruedRewards", message: holderAccruedRewards.rewards})    
                    console.log(holder)  

              
                    const token = await api.contractQuery(
                        state.loterraContractAddressCw20, 
                        {
                        balance: { address: connectedWallet.walletAddress},
                    })
                    dispatch({type: "setLotaBalance", message: token}) 
                    console.log(token)

                    const claims = await api.contractQuery(
                        state.loterraStakingAddress,
                        {
                            claims: { address: connectedWallet.walletAddress },
                        }
                    );
                    console.log("claims")
                    console.log(claims)
                    dispatch({type: "setHolderClaims", message: claims.claims})

                    const tokenLP = await api.contractQuery(
                        state.loterraLPAddress,
                        {
                            balance: { address: connectedWallet.walletAddress},
                        })
                    dispatch({type: "setLPBalance", message: tokenLP})
                    console.log(tokenLP)
                    const LPHolderAccruedRewards = await api.contractQuery(
                        state.loterraStakingLPAddress,
                        {
                            accrued_rewards: { address: connectedWallet.walletAddress },
                        }
                    );
                    dispatch({type: "setLPHolderAccruedRewards", message: LPHolderAccruedRewards.rewards})

                    const holderLP = await api.contractQuery(
                        state.loterraStakingLPAddress,
                        {
                            holder: { address: connectedWallet.walletAddress },
                        }
                    );
                    dispatch({type: "setAllHolderLP", message: holderLP})

                    const claimsLP = await api.contractQuery(
                        state.loterraStakingLPAddress,
                        {
                            claims: { address: connectedWallet.walletAddress },
                        }
                    );

                    dispatch({type: "setHolderClaimsLP", message: claimsLP.claims})



                    const combinations = await api.contractQuery(
                        state.loterraContractAddress,
                        {
                            combination: { lottery_id: contractConfigInfo.lottery_counter, address: connectedWallet.walletAddress},
                        }
                    );
                    dispatch({type: "setAllCombinations", message: combinations})

                    
                    

                }catch (e) {
                    console.log(e)
                }

                //Store coins global state
                dispatch({type: "setAllNativeCoins", message: coins}) 
                console.log(state.allCoins)

                let uusd = coins.filter((c) => {
                    return c.denom === "uusd";
                });
                let ust = parseInt(uusd) / 1000000;
                setBank(numeral(ust).format("0,0.00"));
                // connectTo("extension")
                setConnected(true)
            } else {
                setBank(null);
                dispatch({type: "setWallet", message: {}})  
            }
    }


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
    
      function showSideNav(){
            setSideNav(!sideNav);
      }

    useEffect(() => {
        if(connectedWallet){
            contactBalance()  
        }            
            baseData()             
            console.log(connectedWallet)
            window.addEventListener('scroll',handleScroll)
    }, [connectedWallet, lcd, state.config]);

    

    return(
        <div className={scrolled ? 'navbar navbar-expand p-2 p-md-3 sticky' : 'navbar navbar-expand p-2 p-md-3'}>
        <div className="container-fluid">
             <a className="navbar-brand" href="/"><img src="/logo.png"/> <span>LOTERRA</span></a>
             <nav className={sideNav ? 'navbar-nav main-nav me-auto open' : 'navbar-nav main-nav me-auto'}>   
                <button className="main-nav-close-toggle" onClick={() => showSideNav()}><X size={36} /></button>               
                <li className="nav-item"><a href="/" className="nav-link"><Ticket size={24} style={{marginRight:'3px',position:'relative',top:'-1px'}} /> Lottery</a></li>                 
                <li className="nav-item"><a href="/staking" className="nav-link"><Bank size={24} style={{marginRight:'3px',position:'relative',top:'-1px'}} /> Staking & DAO</a></li>                
            </nav>
             
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
                        <button className="btn btn-default nav-item ms-2 main-nav-toggle" onClick={() => showSideNav()}><List size={26} /></button>

                    </>
                )}
                {connected && (
                    <>
                    <button className="btn btn-default nav-item me-2"
                    style={{
                        padding:'0.275rem 0.55rem'
                    }}
                    onClick={() => setIsModal(!isModal)}>
                    <UserCircle size={33}
                    style={{
                        marginTop: '-2px',
                        color:'#72ffc1'
                    }} />
                    </button>                        
                    <button                       
                        className="btn btn-green nav-item dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {connected ? returnBank() : ''}
                    </button>
                    <ul
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="dropdownMenuButton2"
                        style={{top:'70px'}}
                        >
                            <button
                                        onClick={() => connectTo('disconnect')}
                                        className="dropdown-item"
                                    >
                                        <Power
                                            size={16}
                                            style={{ marginTop: '-4px' }}
                                        />{' '}
                                        Disconnect
                                    </button>
                        </ul>
                        <button className="btn btn-default nav-item ms-2 main-nav-toggle" onClick={() => showSideNav()}><List size={26} /></button>
                    </>
                )}
            </div>
        </div>

        {/*<button onClick={() => display()}>Connect Wallet</button>
        {renderDialog()}*/}
        {connected && connectedWallet &&
            <UserModal open={isModal} toggleModal={() => setIsModal(!isModal)} connetedWallet={connectedWallet}/>
        }
    </div>

    )
}
