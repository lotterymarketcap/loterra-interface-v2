import React, {useState} from "react";
import { TelegramLogo } from "phosphor-react";
import { useStore } from "../../store";
import numeral from "numeral";
import {MsgExecuteContract} from "@terra-money/terra.js"


export default function Unstaking(){
    const {state, dispatch} = useStore();

    function setInputAmount(amount){
        const input = document.querySelector('.amount-input-unstake');
        input.value = amount / 1000000;
    }

    function unstake() {
        var input = document.querySelector('.amount-input-unstake')
        //console.log(type,input.value);
        const amount = parseInt(input.value * 1000000)
        if(amount <= 0){
            showNotification('Input amount empty','error',4000)
            return;
        }
        let msg

        msg = new MsgExecuteContract(
            state.wallet.walletAddress,
            state.loterraStakingAddress,
            {
              unbond_stake: { amount: amount.toString() },
            }
          )        

        state.wallet.post({
            msgs: [msg],
            fee: obj
            // gasPrices: obj.gasPrices(),
            // gasAdjustment: 1.5,
        }).then(e => {
            if (e.success) {   
                    showNotification('Unstake succes','success',4000)             
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
                <p className="input-heading">The amount you want to unstake</p>
                <p className="input-slogan">Staking lote will give you 20% on winner prizes</p>
                <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1"><img src="./LOTA.png" width="30px" className="img-fluid"/></span>
                <input type="number" className="form-control amount-input-unstake" autoComplete="off" placeholder="0.00"  name="amount" />
                </div>
            </div>
            <div className="col-md-12 my-3">
                <p className="shortcut float-end" onClick={()=> setInputAmount(state.allHolder.balance)}>MAX</p>
                <button className="btn btn-default-lg w-100" onClick={()=> unstake()}>Unstake</button>

                <small className="float-end text-muted mt-2">Available: <strong>{ state.wallet &&
                        state.wallet.walletAddress &&
                        (<>{numeral(parseInt(state.allHolder.balance) / 1000000).format('0.00')}</>)
                        } LOTA</strong></small>
            </div>
        </div>
    )
}