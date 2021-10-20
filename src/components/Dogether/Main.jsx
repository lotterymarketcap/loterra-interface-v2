import React, { useState } from 'react'
import { useStore } from '../../store';

import { Bank, Check, Info, Ticket } from 'phosphor-react'
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

export default function Main() {
    const { state, dispatch } = useStore()

    const [amount, setAmount] = useState(0)
    const [percentage, setPercentage] = useState(100)

    const onSlideChange = (render, handle, value, un, percent) => { 
        setPercentage(percent[0].toFixed(2))
    }

    const doGether = (e) => {
        console.log('Dogether with: ',amount,percentage)
    }

    return (
            <>
                
                <p class="input-heading">The amount you want to stake</p>
                <span
                    className="info"
                    style={{
                        color: '#ff36ff',
                        borderColor: '#ff36ff',
                    }}
                >
                    <Info size={14} weight="fill" className="me-1" />
                    Tickets will be <strong>automatically bought</strong> for the LoTerra Lottery when there is yield available, if you have a <strong>winning ticket</strong> prizes will be deposited automatically to your wallet.
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
                        <h4><Ticket size={30} color={'#82f3be'} style={{position:'relative',top:'-3px',marginRight:'4px'}}/>{(amount / 100 * percentage / 100 * 20 / 356 * 7).toFixed(2)}</h4>
                        </div>
                    </div>
                </div>
                <div className="col-6 mb-3">
                    <div className="card stats-card">
                        <div className="card-body">
                        <small className="d-block">NR TICKETS A YEAR</small>
                        <h4><Ticket size={30} color={'#82f3be'} style={{position:'relative',top:'-3px',marginRight:'4px'}}/>{(amount / 100 * percentage / 100 * 20 / 1).toFixed(2)}</h4>
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
    <button className="btn btn-normal-lg w-100 mt-4" onClick={(e) => doGether()}>Stake UST</button>
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
    <button className="btn btn-plain-lg w-100 mt-4" onClick={(e) => doGether()}>Unstake UST</button>
    <strong className="w-100 text-end d-block mt-2"
                        style={{ textDecoration: 'underline', fontSize:'13px', opacity: 0.6 }}
                        onClick={() =>
                             setAmount(state.ustBalance)                            
                        }
                    >
                        MAX: ?? UST                       
                    </strong>
</div>

            </div>
            {/* <p>{amount}</p>
            <p>{percentage}</p> */}
            
        </div>
        
            </>
    )
}
