import React, { useState } from 'react'
import numeral from 'numeral'
import { ChartPie, ArrowDown } from 'phosphor-react'
import PriceLoader from './PriceLoader'

export default function QuickStats(props) {
    const { lotaPrice, marketCap, circulatingSupply } = props

    return (
        <div
            className="how"
            style={{
                background: 'radial-gradient(#f23ff24f, transparent)',
                padding: '55px 0',
            }}
        >
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <ChartPie
                            size={48}
                            color={'#FF36FF'}
                            className="mx-auto d-block mb-2"
                        />
                        <h2>Current LoTerra Stats</h2>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="lota-stats mb-4 mb-md-0">
                            <p>LOTA price</p>
                            {lotaPrice.assets ? (
                                <>
                                    <h5>
                                        {numeral(
                                            lotaPrice.assets[1].amount /
                                                lotaPrice.assets[0].amount
                                        ).format('0.000')}
                                        <span>UST</span>
                                    </h5>
                                    {/* <p>{contractJackpotInfo}</p> */}
                                </>
                            ) : (
                                <PriceLoader />
                            )}
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="lota-stats">
                            <p>Circulating SUPPLY</p>
                            {circulatingSupply() ? (
                                <h5>
                                    {numeral(circulatingSupply()).format(
                                        '0,0.00'
                                    )}
                                    <span>LOTA</span>
                                </h5>
                            ) : (
                                <PriceLoader />
                            )}
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="lota-stats">
                            <p>Market Cap</p>
                            {lotaPrice.assets ? (
                                <h5>
                                    {numeral(marketCap()).format('0,0.00')}
                                    <span>UST</span>
                                </h5>
                            ) : (
                                <PriceLoader />
                            )}
                        </div>
                    </div>
                    <div className="col-md-12 my-3">
                        <div className="d-flex">
                            <button
                                className="btn btn-plain align-self-center mx-auto"
                                onClick={() => scrollToStats()}
                            >
                                Check more stats <ArrowDown size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
