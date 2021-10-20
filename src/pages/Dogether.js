import React,{useState} from 'react'
import ProposalItem from '../components/ProposalItem'
import { useStore } from '../store'
import { StdFee } from '@terra-money/terra.js'
import Footer from '../components/Footer'
import BodyLoader from '../components/BodyLoader'
import { Bank, Check, Info, Ticket } from 'phosphor-react'



import numeral from 'numeral'
import Personal from '../components/Dogether/Personal'
import Main from '../components/Dogether/Main'

export default () => {   

    return (
        <>
            <div
                className="bg-hero"
                style={{
                    backgroundImage:
                        'linear-gradient(0deg, #160150, #170f5300, #17095200),radial-gradient(#f23bf23b , #160150ad), url(/rays.svg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    position: 'relative',
                    top: 0,
                    left: 0,
                    right: 0,
                    width: '100%',
                    minHeight: '800px',
                }}
                
            >
              
                <div className="container h-100">
                
                    <div className="row">
                        <div className="col-12 col-md-8 mx-auto order-1 order-lg-2 p-lg-5">
                        <img src="/dogether-3.png" className="img-fluid" 
                style={{
                    margin:'0 auto',               
                    display:'block',
                    position:'relative',
                }}
                />
                            <div className="card lota-card staking" style={{marginTop:'-25px'}}>  
           
                              
                                <div className="card-body">
                               
                                <div className="row">
                    <div className="col-12 text-center">
                        <ul
                            className="nav nav-pills nav-fill mb-3"
                            id="pills-tab"
                            role="tablist"
                        >
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link active"
                                    id="pills-staking-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-staking"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-staking"
                                    aria-selected="true"
                                >
                                    Dogether
                                </button>
                            </li>

                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link"
                                    id="pills-lpstaking-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-lpstaking"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-lpstaking"
                                    aria-selected="false"
                                >
                                    Your Dogether
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="tab-content" id="pills-tabContent">
                        <div
                            className="tab-pane fade show active"
                            id="pills-staking"
                            role="tabpanel"
                            aria-labelledby="pills-staking-tab"
                        >
                            <Main/>
                        </div>
                        <div
                            className="tab-pane fade"
                            id="pills-lpstaking"
                            role="tabpanel"
                            aria-labelledby="pills-lpstaking-tab"
                        >
                            <Personal/>
                        </div>
                    </div>
                  
                </div>
                               
                           
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
