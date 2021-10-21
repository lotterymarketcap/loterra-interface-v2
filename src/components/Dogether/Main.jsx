import React, { useState } from 'react'
import { useStore } from '../../store';

import { Bank, Check, Info, Ticket } from 'phosphor-react'

// import Nouislider from "nouislider-react";
// import "nouislider/distribute/nouislider.css";
import {MsgExecuteContract, StdFee} from "@terra-money/terra.js";
const obj = new StdFee(700_000, { uusd: 319200 })


export default function Main(props) {
    const { state, dispatch } = useStore()
    const { showNotification } = props

    const [amount, setAmount] = useState(0)
    const [percentage, setPercentage] = useState(100)

    // const onSlideChange = (render, handle, value, un, percent) => { 
    //     setPercentage(percent[0].toFixed(2))
    // }

    const altePercentage = 18;

    function doGether(e) {
        console.log('Dogether with: ',amount,percentage)
        if (amount <= 0) return
        let msg = new MsgExecuteContract(
            state.wallet.walletAddress,
            state.dogetherAddress,
            {
                pool: {},
            },  {"uusd": parseFloat(amount) * 1000000}
        )
        state.wallet
            .post({
                msgs: [msg],
                gasPrices: obj.gasPrices(),
                gasAdjustment: 1.7,
            })
            .then((e) => {
                if (e.success) {
                    showNotification('Pool success', 'success', 4000)
                } else {
                    console.log(e)
                }
            })
            .catch((e) => {
                console.log(e)
                showNotification(e.message, 'error', 4000)
            })
    }
    function doGetherUnstake(){
        console.log('Dogether with: ',amount,percentage)
        if (amount <= 0) return
        let msg = new MsgExecuteContract(
            state.wallet.walletAddress,
            state.dogetherAddress,
            {
                un_pool: {amount: String(parseFloat(amount) * 1000000)}
            },
        )
        state.wallet
            .post({
                msgs: [msg],
                gasPrices: obj.gasPrices(),
                gasAdjustment: 1.7,
            })
            .then((e) => {
                console.log(e)
                if (e.success) {
                    showNotification('UnPool success', 'success', 4000)
                } else {
                    console.log(e)
                }
            })
            .catch((e) => {
                console.log(e)
                // showNotification(e.message, 'error', 4000)
            })
    }

    function claimInfo() {
        if (state.holderClaimsDogether) {
            let total_amount_claimable = 0
            state.holderClaimsDogether.map((e) => {
                if (e.release_at.at_height < state.blockHeight) {
                    total_amount_claimable += parseInt(e.amount)
                }
            })
            return total_amount_claimable / 1000000
        }
        return 0
    }
    function pendingClaim() {
        if (state.holderClaimsDogether) {
            let total_amount_pending = 0
            state.holderClaimsDogether.map((e) => {
                if (e.release_at.at_height > state.blockHeight) {
                    total_amount_pending += parseInt(e.amount)
                }
            })
            return total_amount_pending / 1000000
        }
        return 0
    }

    function claimUnstake() {
        const msg = new MsgExecuteContract(
            state.wallet.walletAddress,
            state.dogetherAddress,
            {
                claim_un_pool: {},
            }
        )
        state.wallet
            .post({
                msgs: [msg],
                gasPrices: obj.gasPrices(),
                gasAdjustment: 1.7,
            })
            .then((e) => {
                if (e.success) {
                    showNotification('Claim unPool success', 'success', 4000)
                } else {
                    console.log(e)
                }
            })
            .catch((e) => {
                console.log(e.message)
                showNotification(e.message, 'error', 4000)
            })
    }

   
    return (
            <>
                    <span className="info mb-3" style={{color:'#ffffffeb'}}>⚠️ We are in contact with security audit, until a full audit report we recommend to use Dogether at your own discretion and risk.</span>

                <p className="input-heading">The amount you want to stake</p>
                <span
                    className="info"
                    style={{
                        color: '#ff36ff',
                        borderColor: '#ff36ff',
                    }}
                >
                    <Info size={14} weight="fill" className="me-1" />
                    Tickets will be <strong>automatically bought</strong> for the LoTerra Lottery 
                </span>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1">
                                        <img src="/UST.svg" width="30px" className="img-fluid"/>
                                    </span>
                                    <input type="number" className="form-control amount-input-staking" onChange={(e) => setAmount(e.target.value)} value={amount} autoComplete="off" placeholder="0.00" name="amount"/>
                                </div>
                                {/* <Nouislider className="slider-round"
                                connect={[true, false]}
                                start={percentage}
                                onSlide={onSlideChange}
                                step={1}
                                range={{
                                min: 0,
                                max: 100
                                }}
                                pips={{
                                mode: 'values',
                                values: [0,50, 100],
                                density: 4
                                }}
                                /> */}
        <div className="dogether-settings-info">
            <div className="row">
            <div className="col-12 text-center">
                        <p className="title">Your Dogether Predictions</p>
                    </div>            
            
                <div className="col-6 mb-3">
                    <div className="card stats-card">
                        <div className="card-body">
                        <small className="d-block">NR TICKETS A WEEK</small>
                        <h4><Ticket size={30} color={'#82f3be'} style={{position:'relative',top:'-3px',marginRight:'4px'}}/>{(amount / 100 * percentage / 100 * altePercentage / 356 * 7).toFixed(2)}</h4>
                        </div>
                    </div>
                </div>
                <div className="col-6 mb-3">
                    <div className="card stats-card">
                        <div className="card-body">
                        <small className="d-block">NR TICKETS A YEAR</small>
                        <h4><Ticket size={30} color={'#82f3be'} style={{position:'relative',top:'-3px',marginRight:'4px'}}/>{(amount / 100 * percentage / 100 * altePercentage / 1).toFixed(2)}</h4>
                        </div>
                    </div>
                </div>
                {/* <div className="col-12 my-3">     
                <div className="row">
                    <div className="col-12">
                        <p style={{color:'#82f3be'}}>+ Average profits</p>
                    </div>
                <div className="col-4">
                    <div className="card stats-card">
                        <div className="card-body">
                        <small className="d-block" style={{color:'#82f3be'}}>DAILY</small>
                        <h4>{(amount / 100 * (100 - percentage) / 100 * 20 / 365 * 1).toFixed(2)} UST</h4>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card stats-card">
                        <div className="card-body">
                        <small className="d-block" style={{color:'#82f3be'}}>MONTHLY</small>
                        <h4>{(amount / 100 * (100 - percentage) / 100 * 20 / 365 * 30).toFixed(2)} UST</h4>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card stats-card">
                        <div className="card-body">
                        <small className="d-block" style={{color:'#82f3be'}}>YEARLY</small>
                        <h4>{(amount / 100 * (100 - percentage) / 100 * 20).toFixed(2) } UST</h4>
                        </div>
                    </div>
                </div>
                </div>
                </div> */}

<div className="col-6">
    <button className="btn btn-normal-lg w-100 mt-2" onClick={(e) => doGether()}>Stake</button>
    <strong className="w-100 text-end d-block mt-2"
                        style={{ textDecoration: 'underline', fontSize:'13px', opacity: 0.6 }}
                        onClick={() =>
                             setAmount(state.ustBalance)                            
                        }
                    >
                        MAX: {state.ustBalance ? state.ustBalance.toFixed(2) : 0} UST                       
                    </strong>
</div>
<div className="col-6">
   
    <button className="btn btn-plain-lg w-100 mt-2" onClick={(e) => doGetherUnstake()}>Unstake</button>
    <strong className="w-100 text-end d-block mt-2"
                        style={{ textDecoration: 'underline', fontSize:'13px', opacity: 0.6 }}
                        onClick={() =>
                             setAmount(parseInt(state.balanceStakeOnDogether) / 1000000)
                        }
                    >
                        MAX: {parseInt(state.balanceStakeOnDogether) / 1000000} UST
                    </strong>
                    <small className="w-100 text-end d-block" style={{color: '#9186c3'}}>Unstaking period 100000 blocks / 7 days</small>
</div>
{pendingClaim() > 0 &&
<div className="col-md-12 my-3">
                <div className="claim-unstake"
                style={{
                    background: '#160842'
                }}
                >
            
                    {/* If unstake claiming condition */}
                    <span className="info">
                        <Info size={14} weight="fill" className="me-1" />
                        Your pending claim amount available soon:
                        <strong>{pendingClaim()} UST</strong>
                        <div style={{ marginTop: '20px' }}>
                            List of pending claims
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <td style={{ paddingLeft: '20px' }}>
                                        Amount
                                    </td>
                                    <td style={{ paddingLeft: '20px' }}>
                                        Release at blockheight
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {state.holderClaimsDogether ? (
                                    state.holderClaimsDogether.map((e) => {
                                        if (
                                            e.release_at.at_height >
                                            state.blockHeight
                                        ) {
                                            return (
                                                <tr>
                                                    <td
                                                        style={{
                                                            paddingLeft: '20px',
                                                        }}
                                                    >
                                                        {parseInt(e.amount) /
                                                        1000000}
                                                        UST
                                                    </td>
                                                    <td
                                                        style={{
                                                            paddingLeft: '20px',
                                                        }}
                                                    >
                                                        {e.release_at.at_height}
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    })
                                ) : (
                                    <tr>
                                        <td>Empty</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </span>
                    <small className="float-end text-muted mt-2">
                        Available:
                        <strong>
                            {state.wallet &&
                                state.wallet.walletAddress &&
                                claimInfo()}
                            UST
                        </strong>
                    </small>                    
                    <button
                        className="btn btn-default w-100"
                        disabled={claimInfo() == 0 ? true : false}
                        onClick={() => claimUnstake()}
                        style={{ marginTop: '10px' }}
                    >
                        Claim unstake
                    </button>
                </div>
            </div>
}
            </div>
            {/* <p>{amount}</p>
            <p>{percentage}</p> */}
            <small><strong>Current blockheight:</strong> {state.blockHeight}</small>
        </div>      
   
          
       
            </>
    )
}
