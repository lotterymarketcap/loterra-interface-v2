import React, {useState} from "react";

import { TwitterLogo,TelegramLogo, Files } from "phosphor-react";

export default function Roadmap(){    

    return (
        <div className="roadmap">
                 <div className="container">
                      <div className="row">
                        <div className="col-12">
                        <h2>Roadmap</h2>
                        <p className="slogan">Here comes a some longer sentence about our roadmap</p>
                      <div className="line">
                            <div className="inner" style={{width:'48%'}}></div>
                            <div className="point" style={{marginLeft:'0%'}}>
                              <span className="point-circle active"></span>
                              <span className="point-title">Q1 2021</span>
                              <p>Development of smart contracts, Website development</p>
                            </div>
                            <div className="point" style={{marginLeft:'25%'}}>
                              <span className="point-circle active"></span>
                              <span className="point-title">Q2 2021</span>
                              <p>Mainnet launch, LOTA listing TerraSwap, Update lottery LoTerra contract-v2</p>
                            </div>
                            <div className="point not-active" style={{marginLeft:'50%'}}>
                              <span className="point-circle"></span>
                              <span className="point-title">Q3 2021</span>                              
                              <p>New interface UX & UI, Burn Altered, Dogether, ScoobyDAO, ILO, SpaceWager, Update lottery v3</p>
                            </div>
                            <div className="marker" style={{marginLeft:'45%'}}>
                              <span className="point-circle"></span>
                              <span className="point-title">We are here</span>
                            </div>
                            <div className="point not-active" style={{marginLeft:'75%'}}>
                              <span className="point-circle"></span>
                              <span className="point-title">Q4 2021</span>
                              <p>NFT Lottery</p>
                            </div>
                      </div>
                        </div>
                        <div className="col-12">
                          
                        </div>
                      </div>
                 </div>
                </div>
        
    )
}