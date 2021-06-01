import React, { Component, Suspense } from 'react'
import  {WalletProvider} from "@terra-money/wallet-provider";
import { Root, Routes } from 'react-static'
import { Router, Link } from '@reach/router'
import Navbar from "./components/Navbar";
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
        <Suspense fallback={<div>Loading... </div>}>
          <WalletProvider defaultNetwork={testnet} walletConnectChainIds={{
            0: testnet,
            1: mainnet,
          }}>
            <Root>
              <Navbar/>
              <div className="content">
                <Router>
                  <Routes default />
                </Router>
              </div>
            </Root>
          </WalletProvider>
        </Suspense>
    )
  }
}

export default App
