import React, {useState, useEffect, useMemo} from "react";
import { X, Ticket,UserCircle } from 'phosphor-react'


export default function TicketModal(props){

    const { open, combo, toggleModal, amount } = props;

    return (
        <>
        <div className={open ? 'ticketmodal show' : 'ticketmodal'}>
            <div className="ticketmodal_heading text-center">
                <h2>Personalize tickets</h2>
                <p>Rather have your own codes, you can edit your codes to your wishes and buy them right away</p>
            </div>
            <div className="ticketmodal_content">
                <ul className="list-group">
            {combo && combo.split(" ").map((obj,k) => {
                          return (
                            <li className="list-group-item" key={k}><Ticket size={24} color={'#4EDC97'} style={{marginRight:'5px'}}/>
                            {obj && Array.from(obj).map( c => {                                
                                return (
                                    <input defaultValue={c} className="form-control text-center" />
                                )
                            })}</li>
                          )
                        })}    
                        </ul>
                        <button className="btn btn-special w-100 my-3">Buy {amount} Tickets</button>
            </div>
        </div>
        <div className={open ? 'backdrop show' : 'backdrop'} onClick={() => toggleModal()}></div>
        </>
    )
}