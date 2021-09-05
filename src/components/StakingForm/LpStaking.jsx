import React, {useState} from "react";
import { TelegramLogo } from "phosphor-react";
import { useStore } from "../../store";
import numeral from "numeral";

export default function LpStaking(){
    const {state, dispatch} = useStore();
    
    function setInputAmount(amount){
        const input = document.querySelector('.amount-input-lpstaking');
        input.value = amount / 1000000;
    }

    function lpStake(){

    }

    return (
        <div className="row">
            <div className="col-md-12">
                <p className="input-heading">The amount you want to lp stake</p>
                <p className="input-slogan">Staking lote will give you 20% on winner prizes</p>
                <input type="number" className="form-control amount-input-lpstaking" name="amount" />
                <p className="input-heading">The amount you want to lp stake</p>
                <p className="input-slogan">Staking lote will give you 20% on winner prizes</p>
                <input type="number" className="form-control amount-input-lpstaking" name="amount" />
            </div>
            <div className="col-md-12 my-3">
                <p className="shortcut float-end" onClick={()=> setInputAmount(state.allHolder.balance)}>MAX</p>
                <button className="btn btn-default-lg w-100" onClick={()=> lpStake()}>Unstake</button>

                <small className="float-end text-muted mt-2">Available: <strong>{ state.wallet &&
                        state.wallet.walletAddress &&
                        (<>{numeral(parseInt(state.allHolder.balance) / 1000000).format('0.00')}</>)
                        } LOTA</strong></small>
            </div>
        </div>
    )
}