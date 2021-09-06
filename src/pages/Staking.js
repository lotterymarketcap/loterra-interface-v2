import React, {useEffect, useState, useCallback, useContext} from "react";

import { Pie, Line } from 'react-chartjs-2';
import ProposalModal from "../components/ProposalModal";
import { Plus, Info } from "phosphor-react";
import ProposalItem from "../components/ProposalItem";
import { lineOptions, lineData, pieData } from "../components/chart/Chart.js";
import {useStore} from "../store";
import {LCDClient, MsgExecuteContract, StdFee, WasmAPI} from "@terra-money/terra.js"
import numeral from "numeral";
import Notification from "../components/Notification";
import Footer from "../components/Footer";
import {parse} from "postcss";
import ApyStats from "../components/ApyStats";
import axios from "axios";
import StakingForm from "../components/StakingForm";

const BURNED_LOTA = 4301383550000;

export default () =>  {

    const addToGas = 5800
    const obj = new StdFee(700_000, { uusd: 319200 + addToGas }) 
    const [notification,setNotification] = useState({type:'success',message:'',show:false})
    const {state, dispatch} = useStore();
    const [modal, setModal] = useState(false);

    function hideNotification(){
        setNotification({
            message:notification.message,
            type: notification.type,
            show: false
        })
    }
  
    function showNotification(message,type,duration){
        //console.log('fired notification')
        setNotification({
            message:message,
            type: type,
            show: true
        })
        //console.log(notification)
        //Disable after $var seconds
        setTimeout(() => {           
            setNotification({ 
                message:message,
                type: type,              
                show: false
            })        
           // console.log('disabled',notification)
        },duration)
    }
    
    

    function claimRewards() {
        const msg = new MsgExecuteContract(
            state.wallet.walletAddress,
            state.loterraStakingAddress,
            {
              claim_rewards: {},
            }
          )
          state.wallet.post({
            msgs: [msg],
            fee: obj
            // gasPrices: obj.gasPrices(),
            // gasAdjustment: 1.5,
        }).then(e => {
            if (e.success) {              
                showNotification('Claim rewards succes','success',4000)
            }
            else{
                console.log(e)
            }
        }).catch(e =>{
            console.log(e.message)
            showNotification(e.message,'error',4000)
        })
    }

    

    function getNotStaked(){
         let staked = parseInt(state.staking.total_balance) / 1000000;
         let sum = staked;
        return sum;
    }

    function getStakedNr (){
        let total = (parseInt(state.tokenInfo.total_supply) - BURNED_LOTA )/ 1000000;
        //console.log("parseInt(state.tokenInfo.balance) - BURNED_LOTA")
        //console.log(state.tokenInfo.total_supply)
        let staked = parseInt(state.staking.total_balance) / 1000000;
        let daoFunds = parseInt(state.daoFunds / 1000000);
        let sum = total - staked - daoFunds;
        return sum;
    }

    function getDaoFunds(){
        return parseInt(state.daoFunds / 1000000)
    }

    return(
        <>
        <div className="hero staking" style={{backgroundImage:'url(/bg.svg)'}}>
            <div className="container h-100 d-md-flex">
                        <div className="row align-self-center">
                            <div className="col-md-12 order-2 order-lg-1 col-lg-4">
                                { state.tokenInfo.total_supply &&
                                     (
                                         <>
                                         <div className="pie-stats">
                                             <div className="row">
                                                 <div className="col-6 text-white">
                                                     <span className="circle-green"></span>Available
                                                 </div>
                                                 <div className="col-6">
                                                    {state.tokenInfo.total_supply ? getStakedNr() : '0'}
                                                 </div>
                                                 <div className="col-6 text-white">
                                                 <span className="circle-pink"></span>DAO
                                                 </div>
                                                 <div className="col-6">
                                                    {state.tokenInfo.total_supply ?  getDaoFunds() : '0'}
                                                 </div>
                                                 <div className="col-6 text-white">
                                                 <span className="circle-grey"></span>Staked
                                                 </div>
                                                 <div className="col-6">
                                                    {state.tokenInfo.total_supply ? getNotStaked() : '0'}
                                                 </div>
                                             </div>
                                         </div>
                                        <Pie data={pieData} data-staked={state.tokenInfo.total_supply ? getStakedNr() : '0'} data-total={state.tokenInfo.total_supply ? getNotStaked() : '0'} data-dao= {state.tokenInfo.total_supply ?  getDaoFunds() : '0'} options={{animation:{duration:0}}} style={{maxHeight:'400px'}}/>
                                        </>    
                                    )
                                }                                                                
                            </div>
                            <div className="col-md-12 col-lg-8 order-1 order-lg-2 p-lg-5">
                                <StakingForm />
                            </div>
                        </div>
                    
                
            </div>
        </div>
        <section className="stakingrewards my-5">
            <div className="container">
                <div className="card lota-card staking-rewards">
                    <div className="card-body">
                        <div className="row">
                            {/* <div className="col-md-6">
                                <div className="current-value">
                                    10.00<span>UST</span>
                                </div>
                            <Line data={lineData} options={lineOptions} style={{background:'#10003b', borderRadius:'10px'}}/>
                            </div> */}
                            <div className="col-md-12 text-center d-flex">
                                    <div className="align-self-center w-100">
                                    <h2>Staking rewards</h2>
                                    { state.wallet && state.wallet.walletAddress &&
                                        (<p>{numeral(parseInt(state.holderAccruedRewards) / 1000000).format('0.00000')} UST</p>)
                                    }
                                    <button className=" btn btn-special mt-3" disabled={state.holderAccruedRewards <= 0 ? true : false} onClick={() => claimRewards()} style={{boxShadow:'none'}}>Claim rewards</button>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* <section className="apystats my-5">
            <div className="container">
                <div className="card lota-card apy-stats">
                    <ApyStats/>
                </div>
            </div>
        </section> */}
        <section className="proposals my-5">
            <div className="container">
                <div className="card lota-card proposals">
                    
                        <div className="row">
                            <div className="col-md-6">
                                <h3>Proposals</h3>
                            </div>
                            <div className="col-md-6 text-end">
                                { /*<button className="btn btn-plain p-3" onClick={() => setModal(!modal)}>Create proposal <Plus size={24} /></button>*/}
                            </div>
                        </div>
                 
                    <div className="card-body">
                        {state.allProposals && state.allProposals.map((element,key) =>{
                            return(<ProposalItem fees={obj} data={element} i={key} key={key}/>)
                        })}
                    </div>
                </div>
            </div>
        </section>
        <Footer/>
        <ProposalModal open={modal} toggleModal={() => setModal(!modal)}/>
        <Notification notification={notification} close={() => hideNotification()}/>            
        </>
    )
}
