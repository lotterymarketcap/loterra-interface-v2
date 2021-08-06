import React, {useState, useEffect, useMemo} from "react";
import { X, Ticket,UserCircle } from 'phosphor-react'


export default function TicketModal(props){

    const { open, combo, toggleModal } = props;

    return (
        <>
        <div className={open ? 'ticketmodal show' : 'ticketmodal'}>
            <div className="ticketmodal_heading text-center">
                <h2>Edit ticket codes</h2>
            </div>
            <div className="ticketmodal_content">
                <ul className="list-group">
            {combo && combo.split(" ").map((obj,k) => {
                          return (
                            <li className="list-group-item" key={k}>{obj && Array.from(obj).map( c => {
                                return (
                                    <input defaultValue={c} className="form-control text-center" />
                                )
                            })}</li>
                          )
                        })}    
                        </ul>
            </div>
        </div>
        <div className={open ? 'backdrop show' : 'backdrop'} onClick={() => toggleModal()}></div>
        </>
    )
}