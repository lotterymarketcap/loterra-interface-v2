
import Link from "next/link";
import { useRouter } from "next/router";

import styles from '../styles/components/Header.module.scss'



export default function Header(){

    const router = useRouter();

    return(
        <header className={styles.header}>
            <nav>
                <ul>
                    <li>
                        <Link href="/">
                            <a className={router.asPath == "/" ? styles.active : ""} href="/">Lottery</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/staking">
                            <a className={router.asPath == "/staking" ? styles.active : ""} href="/staking">Staking</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/dao">
                            <a className={router.asPath == "/dao" ? styles.active : ""} href="/dao">DAO</a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}