import React, { useState } from 'react'
import { TelegramLogo, Info } from 'phosphor-react'
import { useStore } from '../../store'
import { MsgExecuteContract, StdFee } from '@terra-money/terra.js'

import numeral from 'numeral'

const addToGas = 5800
const obj = new StdFee(700_000, { uusd: 319200 + addToGas })

export default function LpStaking(props) {
    const { showNotification } = props
    const { state, dispatch } = useStore()

    function setInputAmount(amount) {
        const input = document.querySelector('.amount-input-lpstaking')
        input.value = amount / 1000000
    }

    function stakeOrUnstake(type) {
        var input = document.querySelector('.amount-input-lpstaking')
        //console.log(type,input.value);
        const amount = parseInt(input.value * 1000000)
        if (amount <= 0) {
            showNotification('Input amount empty', 'error', 4000)
            return
        }
        let msg
        if (type == 'stake') {
            msg = new MsgExecuteContract(
                state.wallet.walletAddress,
                state.loterraLPAddress,
                {
                    send: {
                        contract: state.loterraStakingLPAddress,
                        amount: amount.toString(),
                        msg: 'eyAiYm9uZF9zdGFrZSI6IHt9IH0=',
                    },
                }
            )
        } else {
            msg = new MsgExecuteContract(
                state.wallet.walletAddress,
                state.loterraStakingLPAddress,
                {
                    unbond_stake: { amount: amount.toString() },
                }
            )
        }

        state.wallet
            .post({
                msgs: [msg],
                fee: obj,
                // gasPrices: obj.gasPrices(),
                // gasAdjustment: 1.5,
            })
            .then((e) => {
                console.log(e)
                let notification_msg =
                    type == 'stake' ? 'Stake success' : 'Unstake success'
                if (e.success) {
                    showNotification(notification_msg, 'success', 4000)
                } else {
                    console.log(e)
                }
            })
            .catch((e) => {
                console.log(e)
                showNotification(e.message, 'error', 4000)
            })
    }

    function claimInfo() {
        if (state.holderClaimsLP) {
            let total_amount_claimable = 0
            state.holderClaimsLP.map((e) => {
                if (e.release_at.at_height < state.blockHeight) {
                    total_amount_claimable += parseInt(e.amount)
                }
            })
            return <>{total_amount_claimable / 1000000}</>
        }
        return <>0</>
    }
    function pendingClaim() {
        if (state.holderClaimsLP) {
            let total_amount_pending = 0
            state.holderClaimsLP.map((e) => {
                if (e.release_at.at_height > state.blockHeight) {
                    total_amount_pending += parseInt(e.amount)
                }
            })
            return <>{total_amount_pending / 1000000}</>
        }
        return <>0</>
    }

    function claimUnstake() {
        const msg = new MsgExecuteContract(
            state.wallet.walletAddress,
            state.loterraStakingLPAddress,
            {
                withdraw_stake: {},
            }
        )
        state.wallet
            .post({
                msgs: [msg],
                fee: obj,
                // gasPrices: obj.gasPrices(),
                // gasAdjustment: 1.5,
            })
            .then((e) => {
                if (e.success) {
                    showNotification('Claim unstake success', 'success', 4000)
                } else {
                    console.log(e)
                }
            })
            .catch((e) => {
                console.log(e.message)
                showNotification(e.message, 'error', 4000)
            })
    }
    function total_staked() {
        if (state.poolInfo.total_share && state.stateLPStaking.total_balance) {
            const ratio =
                state.poolInfo.total_share / state.poolInfo.assets[0].amount
            const inLota = state.stateLPStaking.total_balance / ratio

            //console.log("state.poolInfo")
            //console.log(inLota / 1000000)
            return inLota / 1000000
        }
    }

    return (
        <div className="row">
            <div className="col-md-12">
                <p className="input-heading">
                    The amount you want to LP Stake
                    <span
                        className="badge"
                        style={{
                            background: '#9bfbcd',
                            color: '#10003b',
                            marginLeft: '7px',
                            position: 'relative',
                            top: '-2px',
                        }}
                    >
                        APR
                        <strong>
                            {total_staked() ? (
                                numeral((100000 / total_staked()) * 100).format(
                                    '0'
                                )
                            ) : (
                                <div
                                    className="spinner-border spinner-border-sm"
                                    role="status"
                                    style={{
                                        position: 'relative',
                                        top: '0px',
                                    }}
                                >
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </div>
                            )}
                            %
                        </strong>
                    </span>
                </p>
                {
                    <p className="input-slogan">
                        Provide liquidity on pair <strong>LOTA-UST</strong> on{' '}
                        <a
                            href="https://app.terraswap.io/#Provide"
                            target="_blank"
                        >
                            Terraswap
                        </a>{' '}
                        and stake your LP token to share: 273.00 LOTA daily
                        rewards | 100,000.00 LOTA year rewards
                    </p>
                }
                <span
                    className="info"
                    style={{
                        color: '#ff36ff',
                        borderColor: '#ff36ff',
                    }}
                >
                    Total staked LP in LOTA:
                    <strong>
                        {total_staked() ? (
                            numeral(total_staked()).format('0,0.000000') +
                            'LOTA'
                        ) : (
                            <div
                                className="spinner-border spinner-border-sm"
                                role="status"
                                style={{
                                    position: 'relative',
                                    top: '0px',
                                }}
                            >
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                        )}
                    </strong>
                </span>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                        <img
                            src="/LOTAUST.png"
                            width="30px"
                            className="img-fluid"
                        />
                    </span>
                    <input
                        type="number"
                        className="form-control amount-input-lpstaking"
                        autoComplete="off"
                        placeholder="0.00"
                        name="amount"
                    />
                </div>
            </div>
            {/*<div className="col-md-12">
                <div className="total-stats w-100">
                    <div className="row">
                        <div className="col-6">
                            Pool APR
                        </div>
                        <div className="col-6 text-end">
                            ?%
                        </div>
                        <div className="col-6">
                            Pool APR
                        </div>
                        <div className="col-6 text-end">
                            ?%
                        </div>
                    </div>
                </div>
            </div>*/}
            <div className="col-6 my-3">
                <button
                    className="btn btn-normal-lg w-100"
                    onClick={() => stakeOrUnstake('stake')}
                >
                    Stake Now
                </button>
                <small className="float-end text-muted mt-2">
                    Available:
                    <strong
                        style={{ textDecoration: 'underline' }}
                        onClick={() =>
                            setInputAmount(parseInt(state.LPBalance.balance))
                        }
                    >
                        {state.wallet && state.wallet.walletAddress && (
                            <>
                                {numeral(
                                    parseInt(state.LPBalance.balance) / 1000000
                                ).format('0.00')}
                            </>
                        )}
                        LOTA
                    </strong>
                </small>
            </div>
            <div className="col-6 my-3">
                <button
                    className="btn btn-plain-lg w-100"
                    onClick={() => stakeOrUnstake('unstake')}
                >
                    Unstake
                </button>

                <small className="float-end text-muted mt-2">
                    Available:
                    <strong
                        style={{ textDecoration: 'underline' }}
                        onClick={() =>
                            setInputAmount(state.allHolderLP.balance)
                        }
                    >
                        {state.wallet && state.wallet.walletAddress && (
                            <>
                                {numeral(
                                    parseInt(state.allHolderLP.balance) /
                                        1000000
                                ).format('0.00')}
                            </>
                        )}
                        LOTA
                    </strong>
                </small>
            </div>

            <div className="col-md-12 my-3">
                <div className="claim-unstake">
                    <p className="input-heading">Claim unstake</p>
                    <p className="input-slogan">
                        Unbonding period of 50,000 block height ~4 | 5 Days, ⚠️
                        unbonding token get no rewards
                    </p>
                    <button
                        className="btn btn-default-lg w-100"
                        onClick={() => claimUnstake()}
                        style={{ marginTop: '7px' }}
                    >
                        Claim unstake
                    </button>
                    {/* If unstake claiming condition */}
                    <span className="info">
                        <Info size={14} weight="fill" className="me-1" />
                        Your pending claim amount available soon:
                        <strong> {pendingClaim()} LOTA</strong>
                        <div style={{ marginTop: '20px' }}>
                            List of pending claims
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <td style={{ paddingLeft: '20px' }}>
                                        Amount
                                    </td>
                                    <td style={{ paddingLeft: '20px' }}>
                                        Release at blockheight
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {state.holderClaimsLP ? (
                                    state.holderClaimsLP.map((e) => {
                                        if (
                                            e.release_at.at_height >
                                            state.blockHeight
                                        ) {
                                            return (
                                                <tr>
                                                    <td
                                                        style={{
                                                            paddingLeft: '20px',
                                                        }}
                                                    >
                                                        {numeral(
                                                            parseInt(e.amount) /
                                                                1000000
                                                        ).format('0,0.000000')}
                                                        LP token
                                                    </td>
                                                    <td
                                                        style={{
                                                            paddingLeft: '20px',
                                                        }}
                                                    >
                                                        {e.release_at.at_height}
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    })
                                ) : (
                                    <tr>
                                        <td>Empty</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </span>
                    <small className="float-end text-muted mt-2">
                        Available:
                        <strong>
                            {state.wallet &&
                                state.wallet.walletAddress &&
                                claimInfo()}
                            LP token
                        </strong>
                    </small>
                </div>
            </div>
        </div>
    )
}
