import React, {useState, useEffect, useMemo} from "react";
import { X, Ticket,UserCircle } from 'phosphor-react'


export default function ProposalModal(props){

    const { open,  toggleModal } = props;

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        console.log(data);
        //Getting specific data by field name
        //data.get('fieldName')
    }

    return (
        <>
        <div className={open ? 'proposalmodal show' : 'proposalmodal'}>
        <button className="toggle" onClick={() => toggleModal()}><X size={36} /></button>

            <div className="proposalmodal_heading text-center">
                <h2>Create proposal</h2>
            </div>
            <div className="proposalmodal_content">
               <form className='proposal_form' onSubmit={(e) => handleSubmit(e)}>
                <div className="row">
                    <div className="col-12">
                        <label>Description</label>
                        <textarea name="description" className="form-control" required></textarea>
                        <label>Proposal</label>
                        <select name="proposal" className="form-control" required>
                            <option value="" disabled selected>Select...</option>
                            <option value="LotteryEveryBlockTime">LotteryEveryBlockTime</option>
                            <option value="HolderFeePercentage">HolderFeePercentage</option>
                            <option value="DrandWorkerFeePercentage">DrandWorkerFeePercentage</option>
                            <option value="PrizePerRank">PrizePerRank</option>
                            <option value="JackpotRewardPercentage">JackpotRewardPercentage</option>
                            <option value="AmountToRegister">AmountToRegister</option>
                            <option value="SecurityMigration">SecurityMigration</option>
                            <option value="DaoFunding">DaoFunding</option>
                            <option value="StakingContractMigration">StakingContractMigration</option>
                            <option value="PollSurvey">PollSurvey</option>
                            <option value="NotExist">NotExist</option>
                        </select>
                    </div>
                    <div className="col-6">
                        <label>Amount</label>
                        <input name="amount" className="form-control" required/>
                    </div>
                    <div className="col-6">
                        <label>Prize per rank</label>
                        <input name="prize_per_rank" className="form-control" required/> 
                    </div>
                    <div className="col-12">
                        <label>Recipient</label>
                        <input name="recipient" className="form-control" required/>
                        <button type="submit" className="btn btn-special w-100 mt-4" style={{boxShadow:'none'}}>Create proposal</button>
                    </div>
                </div>
                   
                   
                 
               </form>
            </div>
        </div>
        <div className={open ? 'backdrop show' : 'backdrop'} onClick={() => toggleModal()}></div>
        </>
    )
}