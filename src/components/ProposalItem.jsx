import React from "react"

export default function ProposalItem(props){

    return (
        <div className="proposal-item">
                            <div className="row">
                                    <div className="col-12">
                                        <h4>Proposal title</h4>
                                        <p className="desc">New upcoming design for LoTerra frontend interface preview here https://drive.google.com/file/d/1JDVwEVQLjQSASunLgb6rXu2QPvvEm2k3/view?usp=drivesdk</p>
                                    </div>
                                    <div className="col-md-8">
                                            <div className="table-responsive">
                                            <table className="table">
                                                <tbody>
                                                <tr>
                                                    <td>Creator</td>
                                                    <td>terra1ar45r5e8y55ku847xvet6ny2psv6fkflhchzxk</td>
                                                </tr>
                                                <tr>
                                                    <td>End block height</td>
                                                    <td>3371352</td>
                                                </tr>
                                                <tr>
                                                    <td>Amount</td>
                                                    <td>50</td>
                                                </tr>
                                                <tr>
                                                    <td>Status</td>
                                                    <td>Passed</td>
                                                </tr>
                                                <tr>
                                                    <td>Price per rank</td>
                                                    <td>[]</td>
                                                </tr>
                                                <tr>
                                                    <td>Proposal</td>
                                                    <td>DaoFunding</td>
                                                </tr>
                                                <tr>
                                                    <td>Yes votes</td>
                                                    <td>2</td>
                                                </tr>
                                                <tr>
                                                    <td>No votes</td>
                                                    <td>0</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                            </div>
                                    </div>
                                    <div className="col-md-4 text-center d-flex">
                                        <div className="vote-box align-self-center w-100">
                                            <h4 className="mb-3">Vote</h4>
                                            <div className="btn-group w-100">
                                                <button className="btn btn-plain">Yes</button>
                                                <button className="btn btn-plain">No</button>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
    )
}