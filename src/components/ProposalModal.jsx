import React, {useState, useEffect, useMemo} from "react";
import { X, Ticket,UserCircle } from 'phosphor-react'


export default function ProposalModal(props){

    const { open,  toggleModal } = props;

    return (
        <>
        <div className={open ? 'proposalmodal show' : 'proposalmodal'}>
            <div className="proposalmodal_heading text-center">
                <h2>Create proposal</h2>
            </div>
            <div className="proposalmodal_content">
               
            </div>
        </div>
        <div className={open ? 'backdrop show' : 'backdrop'} onClick={() => toggleModal()}></div>
        </>
    )
}