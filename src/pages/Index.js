import React, {useEffect, useState} from "react";

// import Jackpot from "../components/Jackpot";
import {StdFee, MsgExecuteContract} from "@terra-money/terra.js"
let useConnectedWallet = {}
if (typeof document !== 'undefined') {
    useConnectedWallet = require('@terra-money/wallet-provider').useConnectedWallet
}

const HomeCard={
    marginTop: '50px',
    width: '100px',
    padding: '30px',
}

export default () => {
    const [combo, setCombo] = useState("")
    let connectedWallet = ""
    if (typeof document !== 'undefined') {
        connectedWallet = useConnectedWallet()
    }

    function execute(){
        const cart = combo.split(" ")
        const obj = new StdFee(10_000_000, { uusd: 2000000 })
        const msg = new MsgExecuteContract(
            connectedWallet.walletAddress,
            "terra1zcf0d95z02u2r923sgupp28mqrdwmt930gn8x5",
            {
                register: {
                    combination: cart,
                },
            },
            { uusd: 1000000 * cart.length }
        )

        connectedWallet.post({
            msgs: [msg],
            gasPrices: obj.gasPrices(),
            gasAdjustment: 1.1,
        })

    }
    function claim(){
        const obj = new StdFee(10_000_000, { uusd: 2000000 })
        const msg = new MsgExecuteContract(
            connectedWallet.walletAddress,
            "terra1zcf0d95z02u2r923sgupp28mqrdwmt930gn8x5",
            {
                claim: {},
            }
        )

        connectedWallet.post({
            msgs: [msg],
            gasPrices: obj.gasPrices(),
            gasAdjustment: 1.1,
        })

    }
    function collect(){
        const obj = new StdFee(10_000_000, { uusd: 2000000 })
        const msg = new MsgExecuteContract(
            connectedWallet.walletAddress,
            "terra1zcf0d95z02u2r923sgupp28mqrdwmt930gn8x5",
            {
                collect: {},
            }
        )

        connectedWallet.post({
            msgs: [msg],
            gasPrices: obj.gasPrices(),
            gasAdjustment: 1.1,
        })

    }

    function change(e) {
        e.preventDefault();
        setCombo(e.target.value)
        console.log(combo.split(" "))
    }

     return (
         <div>
             <div style={{display: "flex", flexDirection:"column", alignItems:"center"}}>
                 <div className="text-3xl">LoTerra</div>
                 <div> contract-v2</div>
                 <div>address: terra1zcf0d95z02u2r923sgupp28mqrdwmt930gn8x5</div>
                 <textarea placeholder="123456 abcdef 1abce2..." style={{width: "300px", height:"300px", marginBottom:"20px", padding:"10px"}} className="card-glass" type="text" value={combo} onChange={(e) => change(e)}  />
                 <div className="text-sm">hint: Enter ticket number from [0-9][a-f] max 6 symbols and spaced</div>
                 <button onClick={()=> execute()} className="button-glass" style={{color:"deeppink"}}>Buy ticket</button>
                 <div style={{display:"flex", marginTop: "10px"}}>
                     <button onClick={()=> claim()} className="button-glass" style={{color:"deeppink", marginRight: "10px"}}>Claim</button>
                     <button onClick={()=> collect()} className="button-glass" style={{color:"deeppink", marginLeft: "10px"}}>Collect</button>
                 </div>
             </div>
         </div>
     );
}
