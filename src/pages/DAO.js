import React from 'react'
import ProposalItem from '../components/ProposalItem'
import { useStore } from '../store'
import { StdFee } from '@terra-money/terra.js'
import PriceLoader from '../components/PriceLoader'
import Footer from '../components/Footer'
import BodyLoader from '../components/BodyLoader'

export default function DAO() {
    const { state, dispatch } = useStore()
    const addToGas = 5800
    const obj = new StdFee(700_000, { uusd: 319200 + addToGas })
    return (
        <>           
            <section className="proposals" style={{marginTop:'100px'}}>
                <div className="container">
                    <div className="card lota-card proposals">
                        <div className="row">
                            <div className="col-md-6">
                                <h3>Proposals</h3>
                            </div>
                            <div className="col-md-6 text-end">
                                {/*<button className="btn btn-plain p-3" onClick={() => setModal(!modal)}>Create proposal <Plus size={24} /></button>*/}
                            </div>
                        </div>

                        <div className="card-body">
                            {state.allProposals.length !== 0 ?
                                state.allProposals
                                    .slice(0)
                                    .reverse()
                                    .sort((a,b) => (a.status == 'InProgress') ? -1 : 1)
                                    .map((element, key) => {
                                        return (                                            
                                            <ProposalItem
                                                fees={obj}
                                                data={element}
                                                i={key}
                                                key={key}
                                            />
                                        )
                                    })
                                    :
                                    <BodyLoader/>
                                    }
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}
