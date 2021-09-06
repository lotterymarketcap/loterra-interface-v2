import React, {useState, useEffect} from "react";
import {useStore} from "../store";
import {MsgExecuteContract} from "@terra-money/terra.js"
import numeral from "numeral";
import axios from "axios";

import { Info } from "phosphor-react";
import Claim from "./StakingForm/Claim";
import Unstaking from "./StakingForm/Unstaking";
import LpStaking from "./StakingForm/LpStaking";
import Staking from "./StakingForm/Staking";

export default function StakingForm(){ 

    const [heightBlock,setBlockHeight] = useState(0)
    const {state, dispatch} = useStore();
   
  

    async function blockHeight(){
        const latestBlocks = await axios.get('https://lcd.terra.dev/blocks/latest')
        setBlockHeight(latestBlocks.data.block.header.height)
        console.log('Block HEIGHT',latestBlocks)
     }


     useEffect(() => {
        blockHeight();
       
      }, [blockHeight]);

    return (
        <div className="card lota-card staking">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-12 text-center">
                                            <ul className="nav nav-pills nav-fill mb-3" id="pills-tab" role="tablist">
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link active" id="pills-staking-tab" data-bs-toggle="pill" data-bs-target="#pills-staking" type="button" role="tab" aria-controls="pills-staking" aria-selected="true">Staking</button>
                                                </li>                                          
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link" id="pills-unstaking-tab" data-bs-toggle="pill" data-bs-target="#pills-unstaking" type="button" role="tab" aria-controls="pills-unstaking" aria-selected="false">Unstaking</button>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link" id="pills-claim-tab" data-bs-toggle="pill" data-bs-target="#pills-claim" type="button" role="tab" aria-controls="pills-claim" aria-selected="false">Claim unstake</button>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link" id="pills-lpstaking-tab" data-bs-toggle="pill" data-bs-target="#pills-lpstaking" type="button" role="tab" aria-controls="pills-lpstaking" aria-selected="false">LP Staking</button>
                                                </li>
                                            </ul>
                                            </div> 
                                            <div className="tab-content" id="pills-tabContent">
                                            <div className="tab-pane fade show active" id="pills-staking" role="tabpanel" aria-labelledby="pills-staking-tab">
                                                <Staking/>                                                
                                            </div>
                                            <div className="tab-pane fade" id="pills-lpstaking" role="tabpanel" aria-labelledby="pills-lpstaking-tab">
                                                <LpStaking/>
                                            
                                            </div>
                                            <div className="tab-pane fade" id="pills-unstaking" role="tabpanel" aria-labelledby="pills-unstaking-tab">
                                                <Unstaking/>
                                           
                                            </div>
                                                <div className="tab-pane fade" id="pills-claim" role="tabpanel" aria-labelledby="pills-claim-tab">
                                                    <Claim/>
                                                    
                                                </div>
                                            </div>                                           
                                            
                                            <div classNaame="col-md-12 my-2 text-start">
                                                <span className="badge rounded-pill" style={{backgroundColor:'#251757',display:'inline-block', color:'#a39dbf', padding:'8px'}}>Latest block height: {heightBlock}</span> 
                                            </div>
                                        </div>
                                    </div>
                                </div>        
    )
}