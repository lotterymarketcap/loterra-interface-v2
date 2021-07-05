import styles from '../styles/components/JackpotCounter.module.scss'

export default function JackpotCounter(){
    return(
        <div className={styles.counter}>
            <div className={styles.container}>
                <p>Next draw in</p>
                <div className={styles.progress}>
                    <span style={{width:'75%'}}></span>
                </div>
                <div className={styles.time_block}>
                    <small>Days</small>
                    <span>02</span>                
                </div>
            <div className={styles.spacer}>:</div>
                <div className={styles.time_block}>
                    <small>Hours</small>
                    <span>08</span>                
                </div>
            <div className={styles.spacer}>:</div>
                <div className={styles.time_block}>
                    <small>Minutes</small>
                    <span>53</span>                
                </div>
            <div className={styles.spacer}>:</div>
                <div className={styles.time_block}>
                    <small>Seconds</small>
                    <span>07</span>                
                </div>
            </div>
        </div>
    )
}