import React, {useState} from "react";
import { TelegramLogo, Info } from "phosphor-react";
import { useStore } from "../../store";
import {MsgExecuteContract} from "@terra-money/terra.js"

import numeral from "numeral";

export default function Claim(){
    const {state, dispatch} = useStore();


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

    return (
        <div className="col-md-12 my-3">
            <p className="input-heading">Claim unstake</p>
            <p className="input-slogan">Staking lote will give you 20% on winner prizes</p>
            <button className="btn btn-default-lg w-100" onClick={()=> claimUnstake()} style={{marginTop:'21px'}}>Claim
                unstake</button>
            {/* If unstake claiming condition */}
            <span className="info">
                <Info size={14} weight="fill" className="me-1" />
                Your pending claim amount available soon:
                <strong>{pendingClaim()} LOTA</strong>
            </span>
            <small className="float-end text-muted mt-2">Available: <strong>
                    {
                    state.wallet && state.wallet.walletAddress && claimInfo()
                    }
                    LOTA</strong></small>
        </div>
    )
}