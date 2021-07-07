import styles from '../styles/components/ProposalModal.module.scss'
import { Ticket, Trash, PlusCircle } from "phosphor-react";


export default function ProposalModal(props){

  

    return(
        <>
            <div className={ props.data ? styles.modal_show : styles.modal}>
            <h2 className={styles.title}>Create proposal</h2>
                <div className="w6 form-group">
                    <label>Field name</label>
                    <input type="text" className="input"/>
                </div>
                <div className="w6 form-group">
                    <label>Field name</label>
                    <input type="text" className="input"/>
                </div>
                <div className="w6 form-group">
                    <label>Field name</label>
                    <input type="text" className="input"/>
                </div>
                <div className="w6 form-group">
                    <label>Field name</label>
                    <input type="text" className="input"/>
                </div>
                <div className="w6 form-group">
                    <label>Field name</label>
                    <input type="text" className="input"/>
                </div> 
                <div className="w6 form-group">
                    <label>Field name</label>
                    <input type="text" className="input"/>
                </div>
                <div className="w12 form-group">
                    <label>Field name</label>
                    <textarea className="input" rows={5}></textarea>
                </div>
                <button className={'pink '+styles.buy_btn}>Create</button>   

            </div>
            <div className={props.data ? styles.backdrop_show : styles.backdrop} onClick={props.click}></div>
        </>
    )
}