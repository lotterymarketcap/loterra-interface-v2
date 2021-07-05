
import styles from '../styles/components/LoterraStats.module.scss'
import { Trophy } from "phosphor-react";

export default function LoterraStats(){
    return(
        <div className="lota-card mt-4">
            <div className={styles.stats}>
                <div className={styles.icon}><Trophy color="#20FF93" weight="regular" size={88} /></div>
                <h2 className="center">Some title <span>Current Lottery</span></h2>
            </div>
        </div>
    )
}