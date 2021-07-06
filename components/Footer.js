import styles from '../styles/components/Footer.module.scss'

export default function Footer(){
    return(
        <div className={styles.footer}>
            <p><strong>Contract address</strong> terra1zcf0d95z02u2r923sgupp28mqrdwmt930gn8x5</p>
            <p><strong>Contract balance</strong> 1,000,000 UST</p>
        </div>
    )
}