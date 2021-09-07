import React, {useState} from "react";
import { TelegramLogo, Info } from "phosphor-react";
import { useStore } from "../../store";
import {MsgExecuteContract,StdFee} from "@terra-money/terra.js"

import numeral from "numeral";

const addToGas = 5800
const obj = new StdFee(700_000, { uusd: 319200 + addToGas }) 


export default function LpStaking(props){
    const {showNotification} = props;
    const {state, dispatch} = useStore();

    function setInputAmount(amount){
        const input = document.querySelector('.amount-input-lpstaking');
        input.value = amount / 1000000;
    }
 
    function stakeOrUnstake(type) {
        var input = document.querySelector('.amount-input-lpstaking')
        //console.log(type,input.value);
        const amount = parseInt(input.value * 1000000)
        if(amount <= 0){
            showNotification('Input amount empty','error',4000)
            return;
        }
        let msg
        if(type == 'stake'){
            msg = new MsgExecuteContract(
                state.wallet.walletAddress,
                state.loterraLPAddress,
                {
                  send: {
                    contract: state.loterraStakingLPAddress,
                    amount: amount.toString(),
                    msg: 'eyAiYm9uZF9zdGFrZSI6IHt9IH0=',
                  },
                }
              ) 
        } else {
            msg = new MsgExecuteContract(
                state.wallet.walletAddress,
                state.loterraStakingLPAddress,
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
            console.log(e)
            if (e.success) {   
                    showNotification('Stake succes','success',4000)                            
            }
            else{
                console.log(e)
            }
        }).catch(e =>{
            console.log(e)
            showNotification(e.message,'error',4000)
        })
    }

    function claimInfo (){
        if (state.holderClaims){
            let total_amount_claimable = 0
            state.holderClaims.map(e => {
                if (e.release_at.at_height < state.blockHeight ) {
                    total_amount_claimable += parseInt(e.amount)
                }
            })
            return  (<>{total_amount_claimable/ 1000000}</>)
        }
        return  (<>0</>)

    }
    function pendingClaim (){
        if (state.holderClaims){
            let total_amount_pending = 0
            state.holderClaims.map(e => {
                if (e.release_at.at_height > state.blockHeight ) {
                    total_amount_pending += parseInt(e.amount)
                }
            })
            return  (<>{total_amount_pending/ 1000000}</>)
        }
        return  (<>0</>)

    }

    function claimUnstake() {
        const msg = new MsgExecuteContract(
            state.wallet.walletAddress,
            state.loterraStakingLPAddress,
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

    return (
        <div className="row">
            <div className="col-md-12">
                <p className="input-heading">The amount you want to LP Stake</p>
                <p className="input-slogan">Staking lota will give you 20% on winner prizes</p>
                <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1"><img src="./LOTAUST.png" width="30px" className="img-fluid"/></span>
                <input type="number" className="form-control amount-input-lpstaking" autoComplete="off" placeholder="0.00"  name="amount" />
                </div>
            </div>
            <div className="col-md-12">
                <div className="total-stats w-100">
                    <div className="row">
                        <div className="col-6">
                            Pool APR
                        </div>
                        <div className="col-6 text-end">
                            0%
                        </div>
                        <div className="col-6">
                            Pool APY
                        </div>
                        <div className="col-6 text-end">
                            0%
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-6 my-3">
                <p className="shortcut float-end" onClick={()=> setInputAmount(parseInt(state.LPBalance.balance))}>MAX
                </p>
                <button className="btn btn-default-lg w-100" onClick={()=> stakeOrUnstake('stake')}>Stake</button>
                <small className="float-end text-muted mt-2">Available: <strong>{ state.wallet &&
                        state.wallet.walletAddress &&
                        (<>{(numeral(parseInt(state.LPBalance.balance) / 1000000).format('0.00'))}</>)
                        } LOTA</strong></small>
            </div>
            <div className="col-md-6 my-3">
                <p className="shortcut float-end" onClick={()=> setInputAmount(state.allHolder.balance)}>MAX</p>
                <button className="btn btn-default-lg w-100" onClick={()=> stakeOrUnstake('unstake')}>Unstake</button>

                <small className="float-end text-muted mt-2">Available: <strong>{ state.wallet &&
                        state.wallet.walletAddress &&
                        (<>{numeral(parseInt(state.allHolder.balance) / 1000000).format('0.00')}</>)
                        } LOTA</strong></small>
            </div>
            <div className="col-md-12 my-3">
            <p className="input-heading">Claim unstake</p>
            <p className="input-slogan">Staking lote will give you 20% on winner prizes</p>
            <button className="btn btn-default-lg w-100" onClick={()=> claimUnstake()} style={{marginTop:'21px'}}>Claim
                unstake</button>
            {/* If unstake claiming condition */}
            <span className="info">
                <Info size={14} weight="fill" className="me-1" />
                Your pending claim amount available soon:
                <strong> {pendingClaim()} LOTA</strong>
            </span>
            <small className="float-end text-muted mt-2">Available: <strong>
                    {
                    state.wallet && state.wallet.walletAddress && claimInfo()
                    }
                    LOTA</strong></small>
        </div>

        </div>
    )
}