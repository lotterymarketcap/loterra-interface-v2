import React, {useState} from "react";
import {
    useConnectedWallet,
    ConnectedWallet,
    useInstallChromeExtension,
    useWallet
} from '@terra-money/wallet-provider';

const Dialog = {
    position: "absolute",
    right: "100px",
    top: "120px",
    width: "300px",
    display: "flex",
    justifyContent: "center",
    flexDirection:"column",
}
const DialogButton = {
    margin: "10px 20px 10px 20px"
}
export default function ConnectWallet(){
    const [isDisplayDialog, setIsDisplayDialog] = useState(false);

    const installChrome = useInstallChromeExtension();
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
    function display(){
        // active or disable dialog
        setIsDisplayDialog(!isDisplayDialog)
        console.log(availableConnectTypes)
        if (isDisplayDialog){
            connect(availableConnectTypes[1])
        }else{
            disconnect()
        }

        console.log(status)
    }
    function connectTo(to){

    }
    function renderDialog(){
        if (isDisplayDialog){
            return(
                <div style={Dialog} className="card">
                    <button onClick={connectTo("extension")} className="button" style={DialogButton}>Terra Station (extension)</button>
                    <button onClick={connectTo("mobile")} className="button" style={DialogButton}>Terra Station (mobile)</button>
                </div>
            )
        }
    }

    return(
        <div>
            <button onClick={display}>Connect Wallet</button>
            {renderDialog()}
        </div>

    )
}