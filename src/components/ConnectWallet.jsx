import React from "react";
import {
    useConnectedWallet,
    ConnectedWallet,
    useWallet
} from '@terra-money/wallet-provider';

export default function ConnectWallet(){
    const connectedWallet = ConnectedWallet ? useConnectedWallet() : undefined;
    const {
        status,
        network,
        availableConnectTypes,
        connect,
        availableInstallTypes,
        install,
        wallets,
        disconnect,
        recheckStatus,
        post,
    } = useWallet();
    return(
        <button>Connect Wallet</button>
    )
}