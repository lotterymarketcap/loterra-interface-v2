import React, {useEffect, useState, useCallback} from "react";
import numeral from "numeral";
import { Users, Ticket} from "phosphor-react";

// import Jackpot from "../components/Jackpot";
import {StdFee, MsgExecuteContract,LCDClient, WasmAPI, BankAPI} from "@terra-money/terra.js"
import Countdown from "../components/Countdown";
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

    const [jackpot, setJackpot] = useState(0);
  const [tickets, setTickets] = useState(0);
  const [players, setPlayers] = useState(0);
  const [price, setPrice] = useState(0);
  const [expiryTimestamp, setExpiryTimestamp] = useState(
    1
  ); /** default timestamp need to be > 1 */

  const fetchContractQuery = useCallback(async () => {
    const terra = new LCDClient({
      URL: "https://lcd.terra.dev/",
      chainID: "columbus-4",
    });
    const api = new WasmAPI(terra.apiRequester);
    try {
      const contractConfigInfo = await api.contractQuery(
        'terra14mevcmeqt0n4myggt7c56l5fl0xw2hwa2mhlg0',
        {
          config: {},
        }
      );
      setPrice(contractConfigInfo.price_per_ticket_to_register)
      setExpiryTimestamp(parseInt(contractConfigInfo.block_time_play * 1000));
      const bank = new BankAPI(terra.apiRequester);
      const contractBalance = await bank.balance('terra14mevcmeqt0n4myggt7c56l5fl0xw2hwa2mhlg0');
      const ustBalance = contractBalance.get('uusd').toData();
      const jackpotAlocation = contractConfigInfo.jackpot_percentage_reward;
      const contractJackpotInfo = ((ustBalance.amount * jackpotAlocation) / 100);

      setJackpot(parseInt(contractJackpotInfo) / 1000000);

      const contractTicketsInfo = await api.contractQuery(
        'terra14mevcmeqt0n4myggt7c56l5fl0xw2hwa2mhlg0',
        {
          count_ticket: { lottery_id: contractConfigInfo.lottery_counter },
        }
      );
      setTickets(parseInt(contractTicketsInfo));

      const contractPlayersInfo = await api.contractQuery(
        'terra14mevcmeqt0n4myggt7c56l5fl0xw2hwa2mhlg0',
        {
          count_player: { lottery_id: contractConfigInfo.lottery_counter },
        }
      );
      setPlayers(parseInt(contractPlayersInfo));
      // Set default tickets to buy is an average bag
      multiplier(parseInt(contractTicketsInfo / contractPlayersInfo))
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    fetchContractQuery();
  }, [fetchContractQuery]);

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
 

    /*function change(e) {
        e.preventDefault();
        setCombo(e.target.value.toLowerCase())
        console.log(combo.split(" "))
        let cart = e.target.value.toLowerCase().replace( /\s\s+/g, ' ' ).split(" ")
        if (cart[0] == ""){
            cart = []
        }
        setAmount(cart.length)
    } */
    function inputChange(e){
        e.preventDefault();
        let ticketAmount = e.target.value
        if (ticketAmount > 200) ticketAmount = 200
        multiplier(ticketAmount)
        setAmount(ticketAmount)
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
        let allCombo = "";
        for (let x=0; x < mul; x++ ){
            let newCombo = generate()
            allCombo = allCombo == "" ? newCombo : allCombo + " " + newCombo
        }
        setCombo(allCombo)
        const cart = allCombo.split(" ")
        setAmount(cart.length)
    }
     return (
         <>
         <div className="hero" style={{backgroundImage:'url(bg.svg)'}}>                
                <div className="container">
                  <div className="row">
                    <div className="col-xl-7 mx-auto text-center">
                      <div className="jackpot">
                        <p>Jackpot</p>
                        <h2>{numeral(jackpot).format("0,0.00")}<span>UST</span></h2>
                      </div>
                    </div>
                    <div className="col-xl-7 mx-auto">
                        <div className="row">
                          <div className="col-6">
                            <div className="card stats-card">
                              <div className="card-body">
                                <div className="row">
                                  <div className="col text-center"><Users size={55} color="#73FFC1" /></div>
                                  <div className="col-md-8 text-center text-md-start">
                                    <h3><span>Players</span>{players}</h3>
                                  </div>
                                </div>                                
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                          <div className="card stats-card">
                              <div className="card-body">
                                <div className="row">
                                  <div className="col text-center"><Ticket size={55} color="#73FFC1" /></div>
                                  <div className="col-md-8 text-center text-md-start">
                                    <h3><span>Tickets</span>{tickets}</h3>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
                  <div className="col-10 col-lg-5 col-xl-4 mx-auto mt-4">
                    <Countdown expiryTimestamp={expiryTimestamp}/>
                  </div>
                 
                
                </div>              
                 
               
                

              

{/* 
             <div className="mt-4">contract-v2.0.1</div>
                <div className="text-sm">terra14mevcmeqt0n4myggt7c56l5fl0xw2hwa2mhlg0</div> */}
           
        </div>
        <div className="container">
                   <div className="row">
                   <div className="col-lg-5 col-xl-4 mx-auto">
                    <div className="card amount-block">
                      <div className="card-body">
                        <h4>Amount of  tickets</h4>
                        <small><span>HINT</span> Assure your prize! Average buying ticket is {numeral((tickets / players)).format('0')}</small>                     
                        <input type="number" className="form-control mt-3" value={amount} min="1" max="200" step="1" onChange={(e) => inputChange(e)} />
                        <p className="my-2">Total: {numeral((amount * price) / 1000000).format("0,0.00")} UST</p>
                        <div className="text-sm">{result}</div>
                        <button onClick={()=> execute()} className="btn btn-special w-100" style={{marginBottom:'-45px'}} disabled={amount <= 0}>Buy {amount} tickets</button>
                      </div>
                    </div>               
            
                      
                  </div>
                      <div className="col-12 text-center">
                          
                      </div>
                   </div>
                 </div>
         </>
     );
}