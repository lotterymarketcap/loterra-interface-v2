import React, {useState} from "react";
import { useConnectedWallet } from '@terra-money/wallet-provider'
// import Jackpot from "../components/Jackpot";
import {StdFee, MsgExecuteContract, } from "@terra-money/terra.js"
const HomeCard={
    marginTop: '50px',
    width: '100px',
    padding: '30px',
}
export default function Index () {
    const [combo, setCombo] = useState("")
    const connectedWallet = useConnectedWallet()

    function execute(){
        const cart = combo.split(" ")
        const obj = new StdFee(10_000_000, { uusd: 2000000 })
        const msg = new MsgExecuteContract(
            connectedWallet.walletAddress,
            "terra1e7hzp3tnsswpfcu6gt4wlgfm20lcsqqywhaagu",
            {
                register: {
                    combination: cart,
                },
            },
            { uusd: 1_000_000 }
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
                 <textarea style={{width: "300px", height:"300px", marginBottom:"20px"}} className="card-glass" type="text" value={combo} onChange={(e) => change(e)}  />
                 <button onClick={()=> execute()} className="button-glass">Buy ticket</button>
             </div>
         </div>

     );
}
