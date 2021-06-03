import React, {useState, useEffect} from "react";

let useWallet = {}
if (typeof document !== 'undefined') {
    useWallet = require('@terra-money/wallet-provider').useWallet
}
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
    let wallet = ""
    if (typeof document !== 'undefined') {
        wallet = useWallet();
    }

    //const installChrome = useInstallChromeExtension();
    //const connectedWallet = ConnectedWallet ? useConnectedWallet() : undefined;


    function display(){
        // active or disable dialog
        setIsDisplayDialog(!isDisplayDialog)
    }
    function closeModal() {
        setIsDisplayDialog(false)
    }
    function connectTo(to) {
        if (to == "extension") {
            wallet.connect(wallet.availableConnectTypes[1])
        }
        else if (to == "mobile") {
            wallet.connect(wallet.availableConnectTypes[2])
        }
        setIsDisplayDialog(false)
    }

    function renderDialog(){
        if (isDisplayDialog){
            return(
                <div style={Modal} onClick={() => closeModal()}>
                    <div style={Dialog} className="card-glass">
                        <button onClick={() => connectTo("extension")} className="button-glass" style={DialogButton}>Terra Station (extension)</button>
                        <button onClick={() => connectTo("mobile")} className="button-glass" style={DialogButton}>Terra Station (mobile)</button>
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