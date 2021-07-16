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
    const [result, setResult] = useState("")
    const [amount, setAmount] = useState(0)
    let connectedWallet = ""
    if (typeof document !== 'undefined') {
        connectedWallet = useConnectedWallet()
    }

    function execute(){
        const cart = combo.split(" ")
        // const obj = new StdFee(1_000_000, { uusd: 200000 })
        const addToGas = 5000 * cart.length
        // const obj = new StdFee(1_000_000, { uusd: 30000 + addToGas })
        const obj = new StdFee(600_000, { uusd: 90000 + addToGas })
        const msg = new MsgExecuteContract(
            connectedWallet.walletAddress,
            "terra14mevcmeqt0n4myggt7c56l5fl0xw2hwa2mhlg0",
            {
                register: {
                    combination: cart,
                },
            },
            { uusd: 1000000 * cart.length }
        )

        connectedWallet.post({
            msgs: [msg],
            fee: obj
            // gasPrices: obj.gasPrices(),
            // gasAdjustment: 1.5,
        }).then(e => {
            if (e.success) {
                setResult("register combination success")
            }
            else{
                setResult("register combination error")
            }
        }).catch(e =>{
            setResult(e.message)
        })

    }
    function claim(){

        const msg = new MsgExecuteContract(
            connectedWallet.walletAddress,
            "terra1zcf0d95z02u2r923sgupp28mqrdwmt930gn8x5",
            {
                claim: {},
            }
        )

        connectedWallet.post({
            msgs: [msg],
            fee: obj
        }).then(e => {
            if (e.success) {
                setResult("claim success")
            }
            else{
                setResult("claim error")
            }
        }).catch(e =>{
            setResult(e.message)
        })

    }
    function collect(){
        const msg = new MsgExecuteContract(
            connectedWallet.walletAddress,
            "terra1zcf0d95z02u2r923sgupp28mqrdwmt930gn8x5",
            {
                collect: {},
            }
        )

        connectedWallet.post({
            msgs: [msg],
            fee: obj
        }).then(e => {
            if (e.success) {
                setResult("collect success")
            }
            else{
                setResult("collect error")
            }
        }).catch(e =>{
            setResult(e.message)
        })

    }

    function change(e) {
        e.preventDefault();
        setCombo(e.target.value.toLowerCase())
        console.log(combo.split(" "))
        const cart = combo.split(" ")
        setAmount(cart.length)
    }
    function generate(){
        const combination = [
            '0',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            'a',
            'b',
            'c',
            'd',
            'e',
            'f',
        ]
        let randomCombination = ''
        for (let x = 0; x < 6; x++) {
            const random = Math.floor(Math.random() * combination.length)
            randomCombination += combination[random]
        }
        return randomCombination
    }

    function multiplier(mul){
        let allCombo = combo;
        for (let x=0; x < mul; x++ ){
            let newCombo = generate()
            allCombo = allCombo == "" ? newCombo : allCombo + " " + newCombo
        }
        setCombo(allCombo)
        const cart = allCombo.split(" ")
        setAmount(cart.length)
    }
     return (
         <div>
             <div style={{display: "flex", flexDirection:"column", alignItems:"center"}}>
                 <div className="text-3xl">LoTerra</div>
                 <div>contract-v2</div>
                 <div className="text-sm">terra14mevcmeqt0n4myggt7c56l5fl0xw2hwa2mhlg0</div>
                 <button onClick={() => multiplier(1)} className="button-glass" style={{color:"deeppink", margin: "10px"}}>Generate combination</button>
                 <button onClick={() => multiplier(10)} className="button-glass" style={{color:"deeppink", margin: "10px"}}>X10</button>
                 <button onClick={() => multiplier(100)} className="button-glass" style={{color:"deeppink", margin: "10px"}}>X100</button>
                 <textarea placeholder="Enter a list of ticket within this format: 123456 abcdef 1abce2..." style={{width: "300px", height:"300px", marginBottom:"20px", padding:"10px"}} className="card-glass" type="text" value={combo} onChange={(e) => change(e)}  />
                 <div className="text-sm">hint: Enter ticket number from [0-9][a-f] max 6 symbols and spaced</div>
                 <div className="text-sm">{result}</div>
                 <div className="text-sm">We recommend to not buy more than 200 tickets per transactions (gas limit)</div>
                 <button onClick={()=> execute()} className="button-glass" style={{color:"deeppink"}}>Buy {amount} tickets</button>
                 <div style={{display:"flex", marginTop: "10px", marginBottom: "10px"}}>
                     <button onClick={()=> claim()} className="button-glass" style={{color:"deeppink", marginRight: "10px"}}>Claim</button>
                     <button onClick={()=> collect()} className="button-glass" style={{color:"deeppink", marginLeft: "10px"}}>Collect</button>
                 </div>
             </div>
         </div>
     );
}