import React, {useState, useEffect, useMemo} from "react";
import { X, Ticket,UserCircle } from 'phosphor-react'
import {StdFee, MsgExecuteContract,LCDClient, WasmAPI, BankAPI} from "@terra-money/terra.js"
import { useStore } from "../store";


export default function AllowanceModal(props){

    const { open,  toggleModal,showNotification } = props;
    const {state, dispatch} = useStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        increaseUserAllowance(data.get('allowance_amount'))
        //console.log(data);
        //Getting specific data by field name
        //data.get('fieldName')
    }

    function increaseUserAllowance(val){     
            const addToGas = 5800
            const obj = new StdFee(700_000, { uusd: 319200 + addToGas }) 
          const msg = new MsgExecuteContract(
            state.wallet.walletAddress,
            'terra15tztd7v9cmv0rhyh37g843j8vfuzp8kw0k5lqv',
            {
                IncreaseAllowance : {
                    spender: state.loterraContractAddress,
                    amount: parseInt(val),
                },
            }      
          )    
  
          state.wallet.post({
              msgs: [msg],
              fee: obj
              // gasPrices: obj.gasPrices(),
              // gasAdjustment: 1.5,
          }).then(e => {
              if (e.success) {
                  //setResult("register combination success")
                  toggleModal()
                  showNotification("Increase allowance success", 'success', 4000)
              }
              else{
                  //setResult("register combination error")
                  toggleModal()
                  showNotification("Increase allowance error", 'error', 4000)
              }
        } )
      
      }
    

    return (
        <>
        <div className={open ? 'allowancemodal show' : 'allowancemodal'}>
        <button className="toggle" onClick={() => toggleModal()}><X size={36} /></button>

            <div className="allowancemodal_heading text-center">
                <h2>Increase Allowance</h2>
            </div>
            <div className="allowancemodal_content">
               <form className='allowancemodal_form' onSubmit={(e) => handleSubmit(e)}>
               <div className="col-12">
                        <label>Allowance amount</label>
                        <input name="allowance_amount" defaultValue={100000000} type="number" className="form-control" required/>
                        <button type="submit" className="btn btn-special w-100 mt-4" style={{boxShadow:'none'}}>Increase allowance</button>
                    </div>                  
               </form>
            </div>
        </div>
        <div className={open ? 'backdrop show' : 'backdrop'} onClick={() => toggleModal()}></div>
        </>
    )
}