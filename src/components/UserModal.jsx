import React, {useState, useEffect, useMemo} from "react";
import { X } from 'phosphor-react'



export default function UserModal(props){

    const { open, toggleModal } = props;

    return(
        <>
        <div className={open ? 'usermodal show' : 'usermodal'}>
            <button className="toggle" onClick={() => toggleModal()}><X size={48} /></button>
        </div>
        <div className={open ? 'backdrop show' : 'backdrop'} onClick={() => toggleModal()}></div>
        </>
    )
}