import React, {useState, useEffect, useMemo} from "react";
import { X, Ticket,UserCircle } from 'phosphor-react'
import {useStore} from "../store";

import toast, { Toaster } from 'react-hot-toast';


export default function TicketModal(props){

    const { open, toggleModal, amount, updateCombos } = props;
    const store = useStore();

    const combination = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
    ]

    return (
        <>
        <div className={open ? 'ticketmodal show' : 'ticketmodal'}>
            <button className="toggle" onClick={() => toggleModal()}><X size={36} /></button>

            <div className="ticketmodal_heading text-center">
                <h2>Personalize tickets</h2>
                <p>Rather have your own codes, you can edit your codes to your wishes and buy them right away</p>
            </div>
            <div className="ticketmodal_content">
                <ul className="list-group">
            {store.state.combination && store.state.combination.split(" ").map((obj,k) => {
                                let combo = store.state.combination.split(" ");
                return (
                            <li className="list-group-item" key={k}><Ticket size={24} color={'#4EDC97'} style={{marginRight:'5px'}}/>
                            {obj && Array.from(obj).map( (c,ck) => {
                                const inputChange = (e,ck,obj,k,c) => {
                                    let x = obj;
                                    e.preventDefault();
                                    if(!combination.includes(e.target.value)){
                                        toast.error('this value is invalid, you have the following options: [a,b,c,d,e,f,0,1,2,3,4,5,6,7,8,9]')
                                        e.target.value = c;
                                        return;
                                    }
                                    x.substring(k, e.target.value)
                                    console.log('x',x)
                                    console.log('obj',obj)
                                    console.log('key',k)
                                    //Check for the values we want
                                    console.log('handle change called',ck,e.target.value,obj)
                                    //Trial replacing current string with new
                                    const new_code = [];
                                    Array.from(obj).map((item,key) => {
                                        if(key==ck){
                                            item = e.target.value
                                        }
                                        new_code.push(item);
                                    })
                                    console.log('new code should become',new_code.join(""),'string index in combos should be:',k)
                                    if (new_code.join("").length == 6){
                                        combo[k] = new_code.join("");
                                        store.dispatch({type: "setCombination", message: combo.join(" ")})
                                    }
                                    //updateCombos(new_code.join(""),k)

                                }
                                return (
                                    <input defaultValue={c} key={ck} className="form-control text-center" maxLength="1" onChange={(e) => inputChange(e,ck,obj,k,c)}/>
                                )
                            })}</li>
                          )
                        })
            }
                        </ul>
                        <button className="btn btn-special w-100 my-3">Buy {amount} Tickets</button>
            </div>
        </div>
        <div className={open ? 'backdrop show' : 'backdrop'} onClick={() => toggleModal()}></div>
        </>
    )
}