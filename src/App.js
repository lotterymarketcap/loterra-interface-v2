import React, { Component, Suspense } from 'react'
import { Root, Routes } from 'react-static'
import { Router, Link } from '@reach/router'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
let Wallet = {}
if (typeof document !== 'undefined') {
    Wallet = require("@terra-money/wallet-provider").WalletProvider
}

import './styles/app.css'


const mainnet = {
    name: 'mainnet',
    chainID: 'columbus-4',
    lcd: 'https://lcd.terra.dev',
};

const testnet = {
    name: 'testnet',
    chainID: 'tequila-0004',
    lcd: 'https://tequila-lcd.terra.dev',
};

class App extends Component {
  render() {
    return (
        <Wallet defaultNetwork={mainnet} walletConnectChainIds={{
            0: testnet,
            1: mainnet,
        }}>
            <Suspense fallback={<div>Loading... </div>}>
                <Root>
                  <Navbar/>
                  <div className="content">
                      <Routes default />
                  </div>
                  {/*<Footer/>*/}
                </Root>
            </Suspense>
        </Wallet>
    )
  }
}

export default App
