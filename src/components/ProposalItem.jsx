import numeral from "numeral";
import React from "react"
import { MsgExecuteContract} from "@terra-money/terra.js"
import { useStore } from "../store";

export default function ProposalItem(props){

    const {data,i} = props;
    const {state, dispatch} = useStore();

    const vote = (approve,id) => {
        const msg = new MsgExecuteContract(
            state.wallet.senderAddress,
            state.loterraContractAddress,
            {
              vote: {
                poll_id: id,
                approve,
              },
            }
          )
    }

    return (
        <div className="proposal-item" key={i}>
                            <div className="row">
                                    <div className="col-12">
                                        <h4>Proposal number {i+1}</h4>
                                        <p className="desc">{data.description}</p>
                                    </div>
                                    <div className="col-md-8">
                                            <div className="table-responsive">
                                            <table className="table">
                                                <tbody>
                                                <tr>
                                                    <td>Creator</td>
                                                    <td>{data.creator}</td>
                                                </tr>
                                                <tr>
                                                    <td>End block height</td>
                                                    <td>{data.end_height}</td>
                                                </tr>
                                                <tr>
                                                    <td>Amount</td>
                                                    <td>{data.amount}</td>
                                                </tr>
                                                <tr>
                                                    <td>Status</td>
                                                    <td>{data.status}</td>
                                                </tr>
                                                <tr>
                                                    <td>Prize per rank</td>
                                                    <td>[{data.prize_per_rank.toString()}]</td>
                                                </tr>
                                                <tr>
                                                    <td>Proposal</td>
                                                    <td>{data.proposal}</td>
                                                </tr>
                                                <tr>
                                                    <td>Yes votes</td>
                                                    <td>{data.yes_vote}</td>
                                                </tr>
                                                <tr>
                                                    <td>No votes</td>
                                                    <td>{data.no_vote}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                            </div>
                                    </div>
                                    <div className="col-md-4 text-center d-flex">
                                        <div className="vote-box align-self-center w-100">
                                            <h4 className="mb-3">Vote</h4>
                                            <div className="btn-group w-100">
                                                {state.wallet.walletAddress && 
                                                (
                                                    <>
                                                        <button className="btn btn-plain" onClick={() => vote(true,i+1)}>Yes</button>
                                                        <button className="btn btn-plain" onClick={() => vote(false,i+1)}>No</button>
                                                    </>
                                                )
                                                }
                                                {state.wallet.walletAddress === undefined && 
                                                (
                                                    <>
                                                        <button className="btn btn-plain">Connect wallet</button>                                                        
                                                    </>
                                                )
                                                }
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
    )
}