import React, {useState} from "react";
import {
    useConnectedWallet,
    ConnectedWallet,
    useInstallChromeExtension,
    useWallet
} from '@terra-money/wallet-provider';
const Modal = {
    position: "absolute",
    width: "100%",
    height:"100%",
    left: "0",
    top: "0",
}
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
    }
    function closeModal() {
        setIsDisplayDialog(false)
    }
    function connectTo(to) {
        if (to == "extension") {
            connect(availableConnectTypes[1])
        }
        else if (to == "mobile") {
            connect(availableConnectTypes[2])
        }
        setIsDisplayDialog(false)
    }

    function renderDialog(){
        if (isDisplayDialog){
            return(
                <div style={Modal} onClick={() => closeModal()}>
                    <div style={Dialog} className="drop-down">
                        <button onClick={() => connectTo("extension")} className="button-two" style={DialogButton}>Terra Station (extension)</button>
                        <button onClick={() => connectTo("mobile")} className="button-two" style={DialogButton}>Terra Station (mobile)</button>
                    </div>
                </div>
            )
        }
    }

    return(
        <div>
            <button onClick={() => display()}>Connect Wallet</button>
            {renderDialog()}
        </div>

    )
}