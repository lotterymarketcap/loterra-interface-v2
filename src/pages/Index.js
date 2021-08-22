import React, {useEffect, useState, useCallback, useContext} from "react";
import numeral from "numeral";
import { Users, Ticket, Trophy, UserCircle, ChartPie, PlusCircle, MinusCircle} from "phosphor-react";
// import Jackpot from "../components/Jackpot";
import {StdFee, MsgExecuteContract,LCDClient, WasmAPI, BankAPI} from "@terra-money/terra.js"
import Countdown from "../components/Countdown";
import TicketModal from "../components/TicketModal";

import { useStore } from "../store";

import Notification from "../components/Notification";
import SocialShare from "../components/SocialShare";
import Footer from "../components/Footer";
 
let useConnectedWallet = {}
if (typeof document !== 'undefined') {
    useConnectedWallet = require('@terra-money/wallet-provider').useConnectedWallet
}

const HomeCard={
    marginTop: '50px',
    width: '100px',
    padding: '30px',
}

const loterra_contract_address = "terra14mevcmeqt0n4myggt7c56l5fl0xw2hwa2mhlg0"
const loterra_pool_address ="terra1pn20mcwnmeyxf68vpt3cyel3n57qm9mp289jta"

export default () => {
    const [jackpot, setJackpot] = useState(0);
  const [tickets, setTickets] = useState(0);
  const [players, setPlayers] = useState(0);
  const [winners, setWinners] = useState(0);
  const [notification,setNotification] = useState({type:'success',message:'',show:false})
  const [LatestWinningCombination, setLatestWinningCombination] = useState(0);
  const [prizeRankWinnerPercentage, setPrizeRankWinnerPercentage] = useState(0);
  const [ticketModal, setTicketModal] = useState(0);
  const [price, setPrice] = useState(0);
  const [contractBalance, setContractBalance] = useState(0);
  const [lotaPrice, setLotaPrice] = useState(0);
  const [expiryTimestamp, setExpiryTimestamp] = useState(
    1
  ); /** default timestamp need to be > 1 */
  const [tokenHolderFee, setTokenHolderFee] = useState(0);
  const [allWinners, setAllWinners] = useState([]);
  const {state, dispatch} = useStore();

  const fetchContractQuery = useCallback(async () => {
    const terra = new LCDClient({
      URL: "https://lcd.terra.dev/",
      chainID: "columbus-4",
    });
    const api = new WasmAPI(terra.apiRequester);
    try {
      const contractConfigInfo = await api.contractQuery(
        loterra_contract_address,
      {
        config: {},
      }
    );

      setPrice(contractConfigInfo.price_per_ticket_to_register)
      setExpiryTimestamp(parseInt(contractConfigInfo.block_time_play * 1000));
      const bank = new BankAPI(terra.apiRequester);
      const contractBalance = await bank.balance(loterra_contract_address);
      const ustBalance = contractBalance.get('uusd').toData();
      const jackpotAlocation = contractConfigInfo.jackpot_percentage_reward;
      const contractJackpotInfo = (ustBalance.amount * jackpotAlocation) / 100;


      setContractBalance(ustBalance.amount / 1000000);
      setTokenHolderFee(contractConfigInfo.token_holder_percentage_fee_reward);
      setJackpot(parseInt(contractJackpotInfo) / 1000000);
      setPrizeRankWinnerPercentage(contractConfigInfo.prize_rank_winner_percentage);

      const contractTicketsInfo = await api.contractQuery(
          loterra_contract_address,
        {
          count_ticket: { lottery_id: contractConfigInfo.lottery_counter },
        }
      );
      setTickets(parseInt(contractTicketsInfo));

      const contractPlayersInfo = await api.contractQuery(
        loterra_contract_address,
        {
          count_player: { lottery_id: contractConfigInfo.lottery_counter },
        }
      );
      setPlayers(parseInt(contractPlayersInfo));
      // Set default tickets to buy is an average bag
      multiplier(parseInt(isNaN(contractTicketsInfo / contractPlayersInfo) ? 1 : contractTicketsInfo / contractPlayersInfo ))

      //Get poll data


      //Get Winners
      const contractWinnersInfo = await api.contractQuery(
          loterra_contract_address,
        {
          winner: { lottery_id: contractConfigInfo.lottery_counter - 1  },
        }
      );
      setWinners(contractWinnersInfo)

      //Get latest winning combination
      const winningCombination = await api.contractQuery(
        loterra_contract_address,
      {
        winning_combination: { lottery_id: contractConfigInfo.lottery_counter - 1  },
      }
    );
    setLatestWinningCombination(winningCombination)

      //Get current lota price
      const currentLotaPrice = await api.contractQuery(
          loterra_pool_address,
        {
          pool: {},
        }
      );
      setLotaPrice(currentLotaPrice)

     


      //Dev purposes disable for production
      console.log('contract info',contractConfigInfo)

        // Query all winners
        const {winners} = await api.contractQuery(loterra_contract_address, {
            winner:{
                lottery_id: contractConfigInfo.lottery_counter - 1
            }
        });
      dispatch({type: "setAllWinners", message: winners})
        // Query all players
        const players = await api.contractQuery(loterra_contract_address, {
            players:{
                lottery_id: contractConfigInfo.lottery_counter - 1
            }
        });
      dispatch({type: "setAllPlayers", message: players})

    } catch (e) {
      console.log(e);
    }
  }, []);

 

  useEffect(() => {
    fetchContractQuery();
   
  }, [fetchContractQuery]);
    let connectedWallet = ""
    if (typeof document !== 'undefined') {
        connectedWallet = useConnectedWallet()
    }

    const [combo, setCombo] = useState("")
    const [result, setResult] = useState("")
    const [amount, setAmount] = useState(0)

    function checkIfDuplicateExists(w){
      return new Set(w).size !== w.length 
    }

    function execute(){
        const cart = state.combination.split(" ") // combo.split(" ")
        if(checkIfDuplicateExists(cart)){
          showNotification('Combinations contain duplicate','error',4000);
          return;
        }
        // const obj = new StdFee(1_000_000, { uusd: 200000 })
        const addToGas = 5800 * cart.length
        // const obj = new StdFee(1_000_000, { uusd: 30000 + addToGas })
        const obj = new StdFee(610_000, { uusd: 91500 + addToGas })
        const msg = new MsgExecuteContract(
            connectedWallet.walletAddress,
            loterra_contract_address,
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
                //setResult("register combination success")
                showNotification("register combination success", 'success', 4000)
            }
            else{
                //setResult("register combination error")
                showNotification("register combination error", 'error', 4000)
            }
        }).catch(e =>{
            //setResult(e.message)
            showNotification(e.message, 'error', 4000)
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
        addCode(ticketAmount)
        setAmount(ticketAmount)
    }

    function addCode(amount){
      if (amount >=1) {
      console.log(state.combination,amount)
      let copy = state.combination.split(" ");
      if(amount < copy.length){
        let nr = copy.length - amount;
        copy.splice(-nr);
      } else {
        let nr = amount - copy.length;
        for (let index = 0; index < nr; index++) {
          let newCombo = generate()
          copy.push(newCombo)
        }
        
      }
      let filtered = copy.filter(function (el) {
  return el != null;
});
      let string = filtered.join(" ");
      dispatch({type: "setCombination", message: string})
      }
    }

    function getPrizePerRank(nr){
        let rank = nr-1;
        return numeral(
          (prizeRankWinnerPercentage[rank] * parseInt(jackpot)) / 100
        ).format('0,0.00')
    }
    function getPrizePerRankGross(nr){
        let rank = nr-1;
        return numeral(
            (prizeRankWinnerPercentage[rank] * parseInt(jackpot) - (prizeRankWinnerPercentage[rank] * parseInt(jackpot) * tokenHolderFee / 100)) / 100
        ).format('0,0.00')
    }
    function getPrizePerRankTax(nr){
        let rank = nr-1;
        return numeral(
            (prizeRankWinnerPercentage[rank] * parseInt(jackpot) / 100) * (tokenHolderFee / 100)
        ).format('0,0.00')
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
        // setCombo(allCombo)
        dispatch({type: "setCombination", message: allCombo})
        const cart = allCombo.split(" ")
        setAmount(cart.length)
    }


    function updateCombos(new_code,index){
      console.log('updating combos', new_code, index)
      let copy = state.combination;
      copy.split(" ").map((obj,k) => {
        if(k == index){
          console.log(obj,' will be ',new_code)
          obj = new_code
        }
      })
      toast('you changed a ticket code')
      dispatch({type: "setCombination", message: copy})
      console.log(copy)
      console.log(state.combination)      
    }  

    function hideNotification(){
      setNotification({
          message:notification.message,
          type: notification.type,
          show: false
      })
  }

  function showNotification(message,type,duration){
      console.log('fired notification')
      setNotification({
          message:message,
          type: type,
          show: true
      })
      console.log(notification)
      //Disable after $var seconds
      setTimeout(() => {           
          setNotification({ 
              message:message,
              type: type,              
              show: false
          })        
          console.log('disabled',notification)
      },duration)
  }

  function amountChange(type){    
        let ticketAmount = amount;
        if(type == 'up'){
          ticketAmount++;
        } else {
          ticketAmount--;
        }
        if (ticketAmount <= 1) ticketAmount = 1
        if (ticketAmount > 200) ticketAmount = 200
        addCode(ticketAmount)
        setAmount(ticketAmount)
  }

     return (
         <>   
         <div className="hero" style={{backgroundImage:'url(rays.svg)', backgroundPosition:'center'}}>
                <div className="container-fluid container-md">
                  <div className="row">
                    <div className="col-lg-12 col-xl-8 mx-auto text-center">
                      <div className="jackpot">
                        <p>Jackpot</p>
                        <h2>{numeral(jackpot).format("0,0.00").split("").map(obj => {
                          return (
                            <div className="roller">
                              {obj} 
                            </div>
                          )
                        })}
                        <div className="roller">
                          <span>UST</span>
                        </div>
                        </h2>
                      </div>
                    </div>
                    <div className="col-xl-7 mx-auto">
                        <div className="row">
                          <div className="col-6">
                            <div className="card stats-card">
                              <div className="card-body">
                                <div className="row">
                                  <div className="col-4 col-md text-center"><Users size={55} color="#73FFC1" /></div>
                                  <div className="col-8 col-md-8 text-center text-md-start">
                                    <h3><span>PLAYERS</span>{players}</h3>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                          <div className="card stats-card">
                              <div className="card-body">
                                <div className="row">
                                  <div className="col-4 col-md text-center"><Ticket size={55} color="#73FFC1" /></div>
                                  <div className="col-8 col-md-8 text-center text-md-start">
                                    <h3><span>TICKETS</span>{tickets}</h3>
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
                        <h3>Book Your Tickets</h3>
                        <small><span>HINT</span> Assure your prize! Average buying ticket is {parseInt(tickets / players)}</small>
                        <div className="input-group mt-3">                         
                            <button className="btn btn-default" onClick={() => amountChange('down')}><MinusCircle size={31} color={'#9183d4'} /></button>                        
                          <input type="number" className="form-control amount-control" value={amount} min="1" max="200" step="1" onChange={(e) => inputChange(e)} />                         
                            <button className="btn btn-default" onClick={() => amountChange('up')}><PlusCircle size={31} color={'#9183d4'} /></button>                         
                        </div>
                        
                        <p className="my-2">Total: <strong>{numeral((amount * price) / 1000000).format("0,0.00")} UST</strong></p>
                        <div className="text-sm">{result}</div>
                        <TicketModal open={ticketModal} amount={amount} updateCombos={(new_code,index) => updateCombos(new_code,index)} buyTickets={() => execute() } toggleModal={() => setTicketModal(!ticketModal)} multiplier={(mul) => multiplier(mul)}/>
                        <button onClick={() => setTicketModal(!ticketModal)} className="btn btn-special-outline w-100 mb-3">Edit ticket codes</button>
                        <button onClick={()=> execute()} className="btn btn-special w-100" disabled={amount <= 0}>Buy {amount} tickets</button>
                      </div>
                    </div>
                    <SocialShare/>
                  </div>
                   </div>
                 </div>

                 <div className="container">
                    <div className="how">
                        <div className="row">
                          <div className="col-md-12">
                            <h2>How it works</h2>
                          </div>
                          <div className="col-md-4 my-2">
                            <div className="step">
                              <label>Step 1</label>
                                <h3>Participate In Lottery</h3>
                                <p>Buy max 200 tickets per transaction</p>
                            </div>
                          </div>
                          <div className="col-md-4 my-2">
                            <div className="step">
                            <label>Step 2</label>
                                <h3>Wait For Draw</h3>
                                <p>The contract draw a lottery every 3 days</p>
                            </div>
                          </div>
                          <div className="col-md-4 my-2">
                            <div className="step">
                            <label>Step 3</label>
                                <h3>Check Your Prizes</h3>
                                <p>Prizes from 3 to 6 symbols</p>
                            </div>
                          </div>
                        </div>
                    </div>
                </div>


                 <div className="container" style={{marginTop:'7rem'}}>
                        <div className="card lota-card">
                          <div className="card-header text-center">
                            <div className="card-header-icon">
                              <Trophy size={90} color="#20FF93"/>
                            </div>
                            <h3>Latest Jackpot Results</h3>
                          </div>
                          <div className="card-body">
                            <div className="w-100 text-center latest-combination">
                            <h4 style={{color:'#ff36ff'}}>Winning combination</h4>
                            <p>{LatestWinningCombination ? LatestWinningCombination.split('').map(obj => {return(<span>{obj}</span>)}) : '...' }</p>
                            </div>
                          <h4 className="mt-4">Rewards</h4>
                          <div className="table-responsive">
                            <table className="table text-white mb-3">
                              <thead>
                                <tr>
                                  <th>Ranks</th>
                                  <th>Symbols</th>
                                  <th>Gross prizes</th>
                                  <th>Net prizes</th>
                                  <th>LOTA tax</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                <th scope="row" className="text-white">#1</th>
                                  <td style={{color:'#FF36FF',minWidth:'100px'}}>6 Symbols</td>
                                  <td>{getPrizePerRank(1)}<span>UST</span></td>
                                  <td>{getPrizePerRankGross(1)}<span>UST</span></td>
                                  <td>{getPrizePerRankTax(1)}<span>UST</span></td>
                                </tr>
                                <tr>
                                <th scope="row" className="text-white">#2</th>
                                  <td style={{color:'#FF36FF',minWidth:'100px'}}>5 Symbols</td>
                                  <td>{getPrizePerRank(2)}<span>UST</span></td>
                                  <td>{getPrizePerRankGross(2)}<span>UST</span></td>
                                  <td>{getPrizePerRankTax(2)}<span>UST</span></td>
                                </tr>
                                <tr>
                                <th scope="row" className="text-white">#3</th>
                                  <td style={{color:'#FF36FF',minWidth:'100px'}}>4 Symbols</td>
                                  <td>{getPrizePerRank(3)}<span>UST</span></td>
                                  <td>{getPrizePerRankGross(3)}<span>UST</span></td>
                                  <td>{getPrizePerRankTax(3)}<span>UST</span></td>
                                </tr>
                                <tr>
                                  <th scope="row" className="text-white">#4</th>
                                  <td style={{color:'#FF36FF',minWidth:'100px'}}>3 Symbols</td>
                                  <td>{getPrizePerRank(4)}<span>UST</span></td>
                                  <td>{getPrizePerRankGross(4)}<span>UST</span></td>
                                  <td>{getPrizePerRankTax(4)}<span>UST</span></td>
                                </tr>
                              </tbody>
                            </table>
                            </div>
                            <h4 className="mt-4">Winners</h4>
                            <div className="table-responsive">
                            <table className="table text-white">
                                <thead>
                                  <tr>
                                  <th scope="col">Rank</th>
                                  <th scope="col">Address</th>
                                  <th scope="col">Collected</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {winners.winners && winners.winners.map((obj,key) => {
                                    return (
                                      <tr key={key}>
                                        <th scope="row" style={{minWidth:'100px'}}><Trophy size={24} color="#4EDC97" className="me-2"/>{obj.claims.ranks.map((r,key) => {
                                          if(key == obj.claims.ranks.length - 1) {
                                            return (r)
                                          } else {
                                            return (r+',')
                                          }

                                        })}</th>
                                        <td style={{minWidth:'450px'}}><UserCircle size={18} color="#827A99" />{obj.address}</td>
                                        <td style={{background:'#0F0038', textAlign:'center'}} className={obj.claims.claimed ? 'collected' : 'uncollected'}>{obj.claims.claimed ? 'Collected' : 'Uncollected'}</td>
                                    </tr>
                                    )
                                  })}
                                </tbody>
                            </table>
                            </div>
                          </div>
                        </div>

                 </div>

                 <div className="container" style={{marginTop:'8rem'}}>
                              <div className="card lota-card">
                              <div className="card-header text-center">
                            <div className="card-header-icon">
                              <ChartPie size={90} color="#20FF93"/>
                            </div>
                            <h3>LoTerra Stats</h3>
                          </div>
                                  <div className="card-body">
                                      <div className="row">
                                        <div className="col-md-6">
                                          <div className="lota-stats mb-4 mb-md-0">
                                          { lotaPrice.assets &&
                                            <>
                                            <p>Current LOTA price</p>
                                            <h5>{numeral((lotaPrice.assets[1].amount/lotaPrice.assets[0].amount)).format('0.000')}<span>UST</span></h5>
                                            {/* <p>{contractJackpotInfo}</p> */}
                                            </>
                                          }
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="lota-stats">
                                              <p>Current lottery balance</p>
                                              <h5>{numeral(contractBalance).format("0,0.00")}<span>UST</span></h5>
                                            </div>
                                        </div>
                                      </div>
                                  </div>
                              </div>
                 </div>
                <Footer/>
                

                 <Notification notification={notification} close={() => hideNotification()}/>                 
         </>
     );
}
