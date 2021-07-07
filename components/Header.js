
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect,useState,useCallback } from "react";
import { ShoppingCartSimple, X, List } from "phosphor-react";

import Bag from './Bag'
import bagstyles from '../styles/components/Bag.module.scss'


import styles from '../styles/components/Header.module.scss'



export default function Header(){

    const router = useRouter();
    const [y, setY] = useState('scroll');

    const [isNav, setIsNav] = useState(false);
    const [isBag, setIsBag] = useState(false);

    const handleNavigation = useCallback(
      e => {
        const window = e.currentTarget;       
        setY(window.scrollY);
      }, [y]
    );
    
    useEffect(() => {     
      setY(window.scrollY);
      window.addEventListener("scroll", handleNavigation);
    
      return () => {
        window.removeEventListener("scroll", handleNavigation);
      };
    }, [handleNavigation]);    
    return(
        <>
        <header className={`${styles.header}` + (y > 0 ? ' '+styles.sticky : '') + (isNav ? ' '+styles.show : '')}>
            <nav>
                <img src="logo.png"/>
                <ul className={styles.header.firstNavigation}> 
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

                <ul className={styles.second_nav}>
                    <li><button className="plain" onClick={() => setIsBag(!isBag)}> <ShoppingCartSimple color="#FFFFFF" weight="regular" size={26} /></button></li>
                    <li><button className="green">Connect wallet</button></li>
                </ul>
               
            </nav>
            <button className={styles.mobile_toggle_nav} onClick={() => setIsNav(!isNav)}><X color="#FFFFFF" weight="regular" size={36} /></button>
        </header>
            <Bag data={isBag} click={()=>setIsBag(!isBag)}/>
         <button className={styles.mobile_toggle} onClick={() => setIsNav(!isNav)}><List color="#FFFFFF" weight="regular" size={36} /></button>
         <img className={styles.mobile_logo} src="logo.png"/>
         <div className={styles.backdrop + (isNav ? ' '+styles.backdrop_show : '')} onClick={() => setIsNav(!isNav)}></div>
        </>
    )
}