import React, {useState} from "react";
import { PlusCircle } from "phosphor-react";
import { useStore } from "../../store";
import numeral from "numeral";

export default function LpStaking(){
    const {state, dispatch} = useStore();
    
    function setInputAmount(amount){
        const input = document.querySelector('.amount-input-lota');
        input.value = amount / 1000000;
    }

    function lpStake(){

    }

    return (
        <div className="row">
            <div className="col-md-12">
                <p className="input-heading">The amount you want to lp stake</p>
                <p className="input-slogan">Staking lota will give you 20% on winner prizes</p>
                <div class="input-group">
                <span class="input-group-text" id="basic-addon1"><img src="./LOTA.png" width="30px" className="img-fluid"/></span>
                <input type="number" className="form-control amount-input-lota" autoComplete="off" placeholder="0.00"   name="amount-lota" />
                </div>
                <div className="w-100 text-center py-2">
                <PlusCircle color={"#44377e"} size={36} />
                </div>
                <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1"><img src="./UST.svg" width="30px" className="img-fluid"/></span>
                <input type="number" className="form-control amount-input-ust" autoComplete="off" placeholder="0.00"  name="amount-ust" />
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
            <div className="col-md-12 my-3">           
                <button className="btn btn-default-lg w-100" onClick={()=> lpStake()}>Deposit</button>

                <small className="float-end text-muted mt-2">Available: <strong onClick={()=> setInputAmount(state.allHolder.balance)}>{ state.wallet &&
                        state.wallet.walletAddress &&
                        (<>{numeral(parseInt(state.allHolder.balance) / 1000000).format('0.00')}</>)
                        } LOTA</strong></small>
            </div>
        </div>
    )
}