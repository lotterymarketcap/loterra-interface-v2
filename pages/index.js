import Head from 'next/head'

import Hero from '../components/Hero'
import LoterraStats from '../components/LoterraStats'

import styles from '../styles/pages/Home.module.scss'

export default function Home() {

  return (
    <>
      <Head>
        <title>Loterra</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero/>
      <div className={styles.container}>
        <LoterraStats/>     
      </div>      
    </>
  )
}