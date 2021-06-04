import React, {useEffect, useState} from "react";
// import Jackpot from "../components/Jackpot";
let {execute, post_gas_auto } = {}
if (typeof document !== 'undefined') {
    require("../helpers/tx")
}
const HomeCard={
    marginTop: '50px',
    width: '100px',
    padding: '30px',
}

export default () => {
    const [combo, setCombo] = useState("")
    const [result, setResult] = useState("")
    if (typeof document !== 'undefined') {
        function buy(){
            const cart = combo.split(" ")
            const msg = {
                register: {
                    combination: cart,
                }
            }
            let txMsg = execute("terra1zcf0d95z02u2r923sgupp28mqrdwmt930gn8x5", msg, { uusd: 1000000 * cart.length })
            post_gas_auto(txMsg)
        }

        function claim(){
            const msg = {
                claim:{}
            }
            let txMsg = execute("terra1zcf0d95z02u2r923sgupp28mqrdwmt930gn8x5", msg)
            post_gas_auto(txMsg)
        }
        function collect(){
            const msg = {
                collect:{}
            }
            let txMsg = execute("terra1zcf0d95z02u2r923sgupp28mqrdwmt930gn8x5", msg)
            post_gas_auto(txMsg)
        }

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
                 <div>contract-v2</div>
                 <div>address: terra1zcf0d95z02u2r923sgupp28mqrdwmt930gn8x5</div>
                 <textarea placeholder="Enter a list of ticket within this format: 123456 abcdef 1abce2..." style={{width: "300px", height:"300px", marginBottom:"20px", padding:"10px"}} className="card-glass" type="text" value={combo} onChange={(e) => change(e)}  />
                 <div className="text-sm">hint: Enter ticket number from [0-9][a-f] max 6 symbols and spaced</div>
                 <div className="text-sm">{result}</div>
                 <button onClick={()=> buy()} className="button-glass" style={{color:"deeppink"}}>Buy tickets</button>
                 <div style={{display:"flex", marginTop: "10px", marginBottom: "10px"}}>
                     <button onClick={()=> claim()} className="button-glass" style={{color:"deeppink", marginRight: "10px"}}>Claim</button>
                     <button onClick={()=> collect()} className="button-glass" style={{color:"deeppink", marginLeft: "10px"}}>Collect</button>
                 </div>
             </div>
         </div>
     );
}
