import {StdFee, MsgExecuteContract} from "@terra-money/terra.js";
let connectedWallet = {}
if (typeof document !== 'undefined') {
    connectedWallet = require('@terra-money/wallet-provider').useConnectedWallet()
}
const obj = new StdFee(10_000_000, { uusd: 2000000 })

let execute =  (contract, msg, coins = null) => {
    return new MsgExecuteContract(
        connectedWallet.walletAddress,
        contract,
        msg,
        coins
    )
}

let post_gas_auto = (msg) =>{
    if (typeof document !== 'undefined') {
        connectedWallet.post({
            msgs: [msg],
            gasPrices: obj.gasPrices(),
            gasAdjustment: 1.1,
        }).then(e => {
            return e.message
        }).catch(e =>{
            return e.message
        })
    }
}
export { post_gas_auto, execute}

