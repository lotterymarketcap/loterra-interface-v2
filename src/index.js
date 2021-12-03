import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import { getChainOptions, WalletProvider } from '@terra-money/wallet-provider';
// Your top level component
import App from './App'

const mainnet = {
    name: 'mainnet',
    chainID: 'columbus-4',
    lcd: 'https://lcd.terra.dev',
}

const testnet = {
    name: 'testnet',
    chainID: 'tequila-0004',
    lcd: 'https://tequila-lcd.terra.dev',
}

// Export your top level component as JSX (for static rendering)
export default App

// Render your app
if (typeof document !== 'undefined') {
    const target = document.getElementById('root')

    const renderMethod = target.hasChildNodes()
        ? ReactDOM.hydrate
        : ReactDOM.render
    let inProduction = true
    const render = (Comp) => {
        getChainOptions().then((chainOptions) => {
        renderMethod(
            <WalletProvider
                {...chainOptions}
                defaultNetwork={mainnet}
                walletConnectChainIds={{
                    0: testnet,
                    1: mainnet,
                }}
                connectorOpts={{
                    bridge: inProduction
                        ? 'https://walletconnect.terra.dev/'
                        : 'https://tequila-walletconnect.terra.dev/',
                }}
            >
                <AppContainer>
                    <Comp />
                </AppContainer>
            </WalletProvider>,
            target
        )
            })
    }

    // Render!
    render(App)

    // Hot Module Replacement
    if (module && module.hot) {
        module.hot.accept('./App', () => {
            render(App)
        })
    }
}
