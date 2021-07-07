import styles from '../styles/components/Bag.module.scss'
import { Ticket, Trash, PlusCircle } from "phosphor-react";


export default function Bag(props){

    const items = [1,2,3,4,5];

    return(
        <>
        <div className={props.data ? styles.modal_show : styles.modal}>
           <h2 className={styles.title}>Your Bag</h2>
           <div className={styles.heading}>
               <h4>Add some more?</h4>
               <p>we’ve made some easy shortcuts for you</p>
               <div className="w4">
                   <button className="plain"><PlusCircle size={24} /> Random</button>
               </div>
               <div className="w4">
                   <button className="plain"><PlusCircle size={24} /> X10</button>
               </div>
               <div className="w4">
                   <button className="plain"><PlusCircle size={24} /> X100</button>
               </div>
           </div>     
           <div className={styles.ticket_list}>
               <p>Total tickets in bag: <strong>{items.length}</strong></p>
                { items.map(obj => {
                    return (
                        <div className={styles.ticket_item}>
                            <Ticket size={36}/>
                            <span>f8bbf5</span>
                            <button className="plain"><Trash size={18}/></button>
                        </div>   
                    )
                })}
            </div>
            <div className={styles.total}>
            <p>Total: <span>3.00 <small>UST</small></span></p>               
            </div>   
            <button className={'pink '+styles.buy_btn}>Buy Tickets</button>   
        </div>
        <div className={props.data ? styles.backdrop_show : styles.backdrop} onClick={props.click}></div>
        </>
    )
}