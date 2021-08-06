import React, {useState, useEffect, useMemo} from "react";
import { X, Ticket,UserCircle } from 'phosphor-react'
import {useStore} from "../store";


export default function TicketModal(props){

    const { open, toggleModal, amount } = props;
    const store = useStore();

    

    return (
        <>
        <div className={open ? 'ticketmodal show' : 'ticketmodal'}>
            <div className="ticketmodal_heading text-center">
                <h2>Personalize tickets</h2>
                <p>Rather have your own codes, you can edit your codes to your wishes and buy them right away</p>
            </div>
            <div className="ticketmodal_content">
                <ul className="list-group">
            {store.state.combination && store.state.combination.split(" ").map((obj,k) => {
                                                     
                          return (
                            <li className="list-group-item" key={k}><Ticket size={24} color={'#4EDC97'} style={{marginRight:'5px'}}/>
                            {obj && Array.from(obj).map( (c,ck) => {
                                const inputChange = (e,ck,obj,k) => {
                                    let x = obj;
                                    e.preventDefault();
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
                                }
                                return (
                                    <input defaultValue={c} key={ck} className="form-control text-center" onChange={(e) => inputChange(e,ck,obj,k)}/>
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