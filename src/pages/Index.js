import React from "react";
import {
    useConnectedWallet,
    ConnectedWallet,
    useWallet
} from '@terra-money/wallet-provider';

export default function Index () {
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
     console.log(status)
     return (<h1>Hello World {connectedWallet}</h1>);
}
