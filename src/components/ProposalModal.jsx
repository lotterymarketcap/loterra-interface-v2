import React, { useState, useEffect, useMemo } from 'react'
import { X, Ticket, UserCircle } from 'phosphor-react'
import { Fee } from '@terra-money/terra.js'

export default function ProposalModal(props) {
    const { open, toggleModal } = props
    const [prizePerRank, setPrizePerRank] = useState(false)
    const [amountToRegister, setAmountToRegister] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        //console.log(data);
        //Getting specific data by field name
        //data.get('fieldName')
    }

    const handleChange = (e) => {
        if (e.target.value == 'PrizePerRank') {
            setPrizePerRank(true)
        } else {
            setPrizePerRank(false)
        }
        if (e.target.value == 'AmountToRegister') {
            setAmountToRegister(true)
        } else {
            setAmountToRegister(false)
        }
    }

    return (
        <>
            <div className={open ? 'proposalmodal show' : 'proposalmodal'}>
                <button className="toggle" onClick={() => toggleModal()}>
                    <X size={36} />
                </button>

                <div className="proposalmodal_heading text-center">
                    <h2>Create proposal</h2>
                </div>
                <div className="proposalmodal_content">
                    <form
                        className="proposal_form"
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <div className="row">
                            <div className="col-12">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    className="form-control"
                                    required
                                ></textarea>
                                <label>Proposal</label>
                                <select
                                    defaultValue={''}
                                    onChange={(e) => handleChange(e)}
                                    name="proposal"
                                    className="form-control"
                                    required
                                >
                                    <option value="" disabled selected>
                                        Select...
                                    </option>
                                    <option value="LotteryEveryBlockTime">
                                        LotteryEveryBlockTime
                                    </option>
                                    <option value="HolderFeePercentage">
                                        Holder fee percentage
                                    </option>
                                    <option value="DrandWorkerFeePercentage">
                                        Drand worker fee percentage
                                    </option>
                                    <option value="PrizePerRank">
                                        Prize per rank
                                    </option>
                                    <option value="JackpotRewardPercentage">
                                        Jackpot reward percentage
                                    </option>
                                    <option value="AmountToRegister">
                                        Amount to register
                                    </option>
                                    <option value="SecurityMigration">
                                        Security migration
                                    </option>
                                    <option value="DaoFunding">
                                        Dao funding
                                    </option>
                                    <option value="StakingContractMigration">
                                        Staking contract migration
                                    </option>
                                    <option value="PollSurvey">
                                        Poll survey
                                    </option>
                                    <option value="NotExist">Not exist</option>
                                </select>
                            </div>
                            {prizePerRank && (
                                <>
                                    <div className="col-3">
                                        <label>Rank 1</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="prize_1"
                                            required
                                        />
                                    </div>
                                    <div className="col-3">
                                        <label>Rank 2</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="prize_2"
                                            required
                                        />
                                    </div>
                                    <div className="col-3">
                                        <label>Rank 3</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="prize_3"
                                            required
                                        />
                                    </div>
                                    <div className="col-3">
                                        <label>Rank 4</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="prize_4"
                                            required
                                        />
                                    </div>
                                </>
                            )}
                            {amountToRegister && (
                                <div className="col-12">
                                    <label>Amount</label>
                                    <input
                                        name="amount"
                                        className="form-control"
                                        required
                                    />
                                </div>
                            )}
                            <div className="col-12">
                                <label>Recipient</label>
                                <input
                                    name="recipient"
                                    className="form-control"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="btn btn-special w-100 mt-4"
                                    style={{ boxShadow: 'none' }}
                                >
                                    Create proposal
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div
                className={open ? 'backdrop show' : 'backdrop'}
                onClick={() => toggleModal()}
            ></div>
        </>
    )
}
