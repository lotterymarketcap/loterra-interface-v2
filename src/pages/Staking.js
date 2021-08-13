import React, {useEffect, useState, useCallback, useContext} from "react";

import { Pie, Line } from 'react-chartjs-2';
import ProposalModal from "../components/ProposalModal";
import { Plus } from "phosphor-react";
import ProposalItem from "../components/ProposalItem";
import { lineOptions, lineData, pieData } from "../components/chart/Chart.js";
import {useStore} from "../store";
import { MsgExecuteContract, StdFee} from "@terra-money/terra.js"
import numeral from "numeral";
import Notification from "../components/Notification";



export default function Staking (){

    const addToGas = 5300
    const obj = new StdFee(600_000, { uusd: 90000 + addToGas })
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
        console.log('fired notification')
        setNotification({
            message:message,
            type: type,
            show: true
        })
        console.log(notification)
        //Disable after $var seconds
        setTimeout(() => {           
            setNotification({ 
                message:message,
                type: type,              
                show: false
            })        
            console.log('disabled',notification)
        },duration)
    }
    
    function stakeOrUnstake(type) {
        var input = document.querySelector('.amount-input')
        console.log(type,input.value);
        const amount = parseInt(input.value * 1000000)
        let msg
        if (type === 'stake') {
            msg = new MsgExecuteContract(
            state.wallet.walletAddress,
            state.loterraStakingAddress,
            {
              send: {
                contract: state.loterraStakingAddress,
                amount: amount.toString(),
                msg: 'eyAiYm9uZF9zdGFrZSI6IHt9IH0=',
              },
            }
          )
        } else {
            msg = MsgExecuteContract(
            state.wallet.walletAddress,
            state.loterraStakingAddress,
            {
              unbond_stake: { amount: amount.toString() },
            }
          )
        }

        state.wallet.post({
            msgs: [msg],
            fee: obj
            // gasPrices: obj.gasPrices(),
            // gasAdjustment: 1.5,
        }).then(e => {
            if (e.success) {    
                if(type == 'stake')          {
                    showNotification('Stake succes','success',4000)
                } else {
                    showNotification('Unstake succes','success',4000)
                }                
            }
            else{
                console.log(e)
            }
        }).catch(e =>{
            console.log(e.message)
            showNotification(e.message,'error',4000)
        })
    }

    function claimUnstake() {
        const msg = new MsgExecuteContract(
            state.wallet.walletAddress,
            state.loterraStakingAddress,
            {
              withdraw_stake: {},
            }
          )
          state.wallet.post({
            msgs: [msg],
            fee: obj
            // gasPrices: obj.gasPrices(),
            // gasAdjustment: 1.5,
        }).then(e => {
            if (e.success) {              
                showNotification('Claim unstake succes','success',4000)
            }
            else{
                console.log(e)
            }
        }).catch(e =>{
            console.log(e.message)
            showNotification(e.message,'error',4000)
        })
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

    function setInputAmount(amount){
        const input = document.querySelector('.amount-input');
        input.value = amount;
    }

 

    return(
        <>
        <div className="hero staking" style={{backgroundImage:'url(bg.svg)'}}>
            <div className="container h-100 d-flex">
                        <div className="row align-self-center">
                            <div className="col-md-4">
                                <Pie data={pieData} options={{animation:{duration:0}}} />
                                <small style={{opacity:'0.5', marginTop:'7px', position:'relative', display:'block', textAlign:'center'}}>Total LOTA staked and available to stake</small>
                            </div>
                            <div className="col-md-8 p-5">
                                <div className="card lota-card staking">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-12 text-center">
                                                <h3>Staking</h3>
                                                <p className="slogan">Unstake or stake your LOTA in order to get rewards and voting weight</p>
                                            </div>
                                            <div className="col-md-12">                                            
                                                <input className="form-control amount-input" name="amount"/>
                                            </div>
                                            <div className="col-md-4 my-3">
                                                <p className="shortcut float-end" onClick={() => setInputAmount(numeral(parseInt(state.LotaBalance.balance) / 1000000).format('0.00'))}>MAX</p>
                                                <button className="btn btn-plain w-100" onClick={() => stakeOrUnstake('stake')}>Stake</button>
                                                <small className="float-end text-muted mt-2">Available: <strong>{ state.wallet && state.wallet.walletAddress &&
                                        (<>{(numeral(parseInt(state.LotaBalance.balance) / 1000000).format('0.00'))}</>)
                                    } LOTA</strong></small>
                                            </div>
                                            <div className="col-md-4 my-3">
                                                <p className="shortcut float-end" onClick={() => setInputAmount(numeral(state.allHolder.balance).format('0.00'))}>MAX</p>
                                                <button className="btn btn-plain w-100" onClick={() => stakeOrUnstake('unstake')}>Unstake</button>
                                                
                                                <small className="float-end text-muted mt-2">Available: <strong>{ state.wallet && state.wallet.walletAddress &&
                                        (<>{numeral(state.allHolder.balance).format('0.00')}</>)
                                    } LOTA</strong></small>
                                            </div>
                                            <div className="col-md-4 my-3">                                                
                                                <button className="btn btn-plain w-100" onClick={() => claimUnstake()} style={{marginTop:'21px'}}>Claim unstake</button>
                                                <small className="float-end text-muted mt-2">Available: <strong>{ state.wallet && state.wallet.walletAddress &&
                                        (<>{numeral(state.allHolder.balance).format('0.00')}</>)
                                    } LOTA</strong></small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                        (<p>{state.allHolder.pending_rewards} UST</p>)
                                    }
                                    <button className=" btn btn-special mt-3" onClick={() => claimRewards()} style={{boxShadow:'none'}}>Claim rewards</button>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="proposals my-5">
            <div className="container">
                <div className="card lota-card proposals">
                    
                        <div className="row">
                            <div className="col-md-6">
                                <h3>Proposals</h3>
                            </div>
                            <div className="col-md-6 text-end">
                                <button className="btn btn-plain p-3" onClick={() => setModal(!modal)}>Create proposal <Plus size={24} /></button>
                            </div>
                        </div>
                 
                    <div className="card-body">
                        {state.allProposals && state.allProposals.map((obj,key) =>{
                            return(<ProposalItem data={obj} i={key} key={key}/>)
                        })}
                    </div>
                </div>
            </div>
        </section>
        <ProposalModal open={modal} toggleModal={() => setModal(!modal)}/>
        <Notification notification={notification} close={() => hideNotification()}/>            
        </>
    )
}