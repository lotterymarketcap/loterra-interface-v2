import React from 'react'
import ProposalItem from '../components/ProposalItem'
import { useStore } from '../store'
import { StdFee } from '@terra-money/terra.js'
import Footer from '../components/Footer'
import BodyLoader from '../components/BodyLoader'
import { Bank, Info } from 'phosphor-react'

export default () => {
    const { state, dispatch } = useStore()
    const addToGas = 5800
    const obj = new StdFee(700_000, { uusd: 319200 + addToGas })
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
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    width: '100%',
                    height: '800px',
                }}
            ></div>
            <section className="proposals" style={{ marginTop: '200px' }}>
                <div className="container">
                    <div className="card lota-card proposals">
                        <div className="card-header text-center">
                            <div className="card-header-icon">
                                <Bank size={90} color="#20FF93" />
                            </div>
                            <h3>DAO</h3>
                            <h5>
                                Decentralized gaming ecosystem managed by LOTA
                                stakers
                            </h5>
                            <h6
                                style={{
                                    color: '#ff36ff',
                                    marginBottom: '20px',
                                    fontWeight: 'normal',
                                }}
                            >
                                <strong>Make decisions together!</strong> Manage
                                the casino, set the price, up the ticket price
                                or go cheap, extract max profits
                            </h6>
                            <span className="info text-start">
                                <Info
                                    size={14}
                                    weight="fill"
                                    className="me-1"
                                />
                                Join our telegram community and discuss. In
                                order for a proposal beeing created we will
                                create firstly a poll in the{' '}
                                <a href="https://t.me/LoTerra" target="_blank">
                                    telegram channel
                                </a>{' '}
                                when this poll reaches 500+ votes with a winning
                                percentage above 15% the proposal will be
                                created on Loterra and LOTA stakers are able to
                                vote.
                            </span>
                        </div>

                        <div className="card-body">
                            {state.allProposals.length !== 0 ? (
                                state.allProposals
                                    .slice(0)
                                    .reverse()
                                    .sort((a, b) =>
                                        a.status == 'InProgress' ? -1 : 1
                                    )
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
                            ) : (
                                <BodyLoader />
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
