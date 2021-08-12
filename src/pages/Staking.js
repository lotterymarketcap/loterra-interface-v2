import React, {useState} from "react";

import { Pie, Line } from 'react-chartjs-2';
import ProposalModal from "../components/ProposalModal";
import { Plus } from "phosphor-react";
import ProposalItem from "../components/ProposalItem";
import { lineOptions, lineData, pieData } from "../components/chart/Chart.js";
import {useStore} from "../store";
import { MsgExecuteContract} from "@terra-money/terra.js"

let useConnectedWallet = {}
if (typeof document !== 'undefined') {
    useConnectedWallet = require('@terra-money/wallet-provider').useConnectedWallet
}

export default function Staking (){
    let connectedWallet = ""
    if (typeof document !== 'undefined') {
        connectedWallet = useConnectedWallet()
    }

    const store = useStore();
    const [modal, setModal] = useState(false);
    
    function stakeOrUnstake(type) {
        var input = document.querySelector('.amount-input')
        console.log(type,input.value);
        const amount = parseInt(input.value * 1000000)
        let msg
        if (type === 'stake') {
            msg = new MsgExecuteContract(
            connectedWallet.walletAddress,
            store.state.loterraStakingAddress,
            {
              send: {
                contract: store.state.loterraStakingAddress,
                amount: amount.toString(),
                msg: 'eyAiYm9uZF9zdGFrZSI6IHt9IH0=',
              },
            }
          )
        } else {
            msg = MsgExecuteContract(
            connectedWallet.walletAddress,
            store.state.loterraStakingAddress,
            {
              unbond_stake: { amount: amount.toString() },
            }
          )
        }

        console.log(msg)
    }

    function claimUnstake() {
        const msg = new MsgExecuteContract(
            connectedWallet.walletAddress,
            store.state.loterraStakingAddress,
            {
              withdraw_stake: {},
            }
          )
    }

    function claimRewards() {
        const msg = new MsgExecuteContract(
            connectedWallet.walletAddress,
            store.state.loterraStakingAddress,
            {
              claim_rewards: {},
            }
          )
    }

 

    return(
        <>
        <div className="hero staking" style={{backgroundImage:'url(bg.svg)'}}>
            <div className="container h-100 d-flex">
                        <div className="row align-self-center">
                            <div className="col-md-4">
                                <Pie data={pieData} />
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
                                                <p className="shortcut float-end">MAX</p>
                                                <button className="btn btn-plain w-100" onClick={() => stakeOrUnstake('stake')}>Stake</button>
                                                <small className="float-end text-muted mt-2">Available: <strong> LOTA</strong></small>
                                            </div>
                                            <div className="col-md-4 my-3">
                                                <p className="shortcut float-end">MAX</p>
                                                <button className="btn btn-plain w-100" onClick={() => stakeOrUnstake('unstake')}>Unstake</button>
                                                
                                                <small className="float-end text-muted mt-2">Available: <strong>{ connectedWallet && connectedWallet.walletAddress &&
                                        (<>{store.state.allHolder.balance}</>)
                                    } LOTA</strong></small>
                                            </div>
                                            <div className="col-md-4 my-3">                                                
                                                <button className="btn btn-plain w-100" onClick={() => claimUnstake()} style={{marginTop:'21px'}}>Claim unstake</button>
                                                <small className="float-end text-muted mt-2">Available: <strong>{ connectedWallet && connectedWallet.walletAddress &&
                                        (<>{store.state.allHolder.balance}</>)
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
                            <div className="col-md-6">
                                <div className="current-value">
                                    10.00<span>UST</span>
                                </div>
                            <Line data={lineData} options={lineOptions} style={{background:'#10003b', borderRadius:'10px'}}/>
                            </div>
                            <div className="col-md-6 text-center d-flex">
                                    <div className="align-self-center w-100">
                                    <h2>Staking rewards</h2>
                                    { connectedWallet && connectedWallet.walletAddress &&
                                        (<p>{store.state.allHolder.pending_rewards} UST</p>)
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
                        {/* Start item */}
                        <ProposalItem/>
                        {/* End item */}
                    </div>
                </div>
            </div>
        </section>
        <ProposalModal open={modal} toggleModal={() => setModal(!modal)}/>
        </>
    )
}