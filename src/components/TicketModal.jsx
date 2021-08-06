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
                            let x = obj;
                            function inputChange (e, count){
                                e.preventDefault();
                                x.substring(count, e.target.value)
                                console.log(x)
                                console.log(obj)
                                console.log(count)
                                console.log(k)
                                console.log('handle change called')
                            }
                          return (
                            <li className="list-group-item" key={k}><Ticket size={24} color={'#4EDC97'} style={{marginRight:'5px'}}/>
                            {obj && Array.from(obj).map( c => {
                                return (
                                    <input defaultValue={c} className="form-control text-center" onChange={(e) => inputChange(e)}/>
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