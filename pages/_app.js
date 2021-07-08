import Header from '../components/Header'
import Footer from '../components/Footer';
import '../styles/globals.scss';

import {
  NetworkInfo,
  StaticWalletProvider,
  WalletProvider,
} from '@terra-money/wallet-provider';
import React from 'react';

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

const walletConnectChainIds = {
  0: testnet,
  1: mainnet,
};

function MyApp({ Component, pageProps }) {
  return process.browser ? (

     <WalletProvider
      defaultNetwork={mainnet}
      walletConnectChainIds={walletConnectChainIds}
    >
    <Header/>
      <Component {...pageProps} />
    <Footer/>
    </WalletProvider>
    
  ) : (
    <StaticWalletProvider defaultNetwork={mainnet}>
      <Header/>
      <Component {...pageProps} />
    <Footer/>
    </StaticWalletProvider>
  );
}

export default MyApp
