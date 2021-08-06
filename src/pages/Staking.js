import React from "react";
import { Pie, Line } from 'react-chartjs-2';


export default function Staking (){

    //Chart code 

    const lineOptions = {
    
        scales:{
          xAxis:{
            beginAtZero:true,
            display:false
          },
          yAxis:{
            beginAtZero:true,
            display:false 
          },
          },
        plugins : {
      
          legend: {
            display: false
        },
        title: {
            display: false
        }
        },
        
    }
      
    
      const lineData = canvas => {
        const ctx = canvas.getContext('2d');  
        let gradientGreen = ctx.createLinearGradient(500, 0, 100, 0);
        gradientGreen.addColorStop(0, '#4DF6A4');
        gradientGreen.addColorStop(1, '#1BC472'); 
    
        return {
          labels: [75,25,10,21,35,40,77],
       
        datasets: [
          {      
            data: [75,25,10,21,35,40,77],
            fill:true,
            backgroundColor:'rgba(32, 255, 147, 0.2)',
            borderColor: [
              gradientGreen,   
            ],
            pointBackgroundColor: '#FFFFFF',
            lineTension: .4,
            borderWidth: 5,
          },
        ],
      
      }
      };
    
      const data = canvas => {
        const ctx = canvas.getContext('2d');
     
        let gradientBlack = ctx.createLinearGradient(500, 0, 100, 0);
        gradientBlack.addColorStop(0, '#3B2E5D');
        gradientBlack.addColorStop(1, '#271A49');
    
        let gradientGreen = ctx.createLinearGradient(500, 0, 100, 0);
        gradientGreen.addColorStop(0, '#4DF6A4');
        gradientGreen.addColorStop(1, '#1BC472'); 
    
        return {
          labels: ['Red', 'Blue'],
        datasets: [
          {
            label: '# of Votes',
            data: [75,25],
            backgroundColor: [
              gradientGreen,
              gradientBlack,          
            ],
            borderColor: [
              gradientGreen,
              gradientBlack,       
            ],
            borderWidth: 1,
          },
        ],
      }
      };

    return(
        <>
        <div className="hero" style={{backgroundImage:'url(bg.svg)'}}>
            <div className="container">
                
                   
                   
                        <div className="row">
                            <div className="col-md-4">
                                <Pie data={data} />
                            </div>
                            <div className="col-md-8">
                                <div className="card lota-card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-12 text-center">
                                                <h3>Staking</h3>
                                                <p>Unstake or stake your LOTA in order to get rewards and voting weight</p>
                                            </div>
                                            <div className="col-md-12">
                                            
                                                <input className="form-control"/>
                                            </div>
                                            <div className="col-md-4 my-3">
                                                <p className="shortcut float-end">MAX</p>
                                                <button className="btn btn-default w-100">Stake</button>
                                                <small className="float-end text-muted mt-2">Available: <strong>100 LOTA</strong></small>
                                            </div>
                                            <div className="col-md-4 my-3">
                                                <p className="shortcut float-end">MAX</p>
                                                <button className="btn btn-default w-100">Unstake</button>
                                                
                                                <small className="float-end text-muted mt-2">Available: <strong>100 LOTA</strong></small>
                                            </div>
                                            <div className="col-md-4 my-3">                                                
                                                <button className="btn btn-default w-100" style={{marginTop:'21px'}}>Claim unstake</button>
                                                <small className="float-end text-muted mt-2">Available: <strong>100 LOTA</strong></small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                
            </div>
        </div>
        <section className="stakingrewards my-5">
            <div className="container">
                <div className="card lota-card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-4">
                            <Line data={lineData} options={lineOptions}/>
                            </div>
                            <div className="col-md-8 text-center">
                                    <h2>Staking rewards</h2>
                                    <p>Claim what is yours, or perhaps another nice sentence</p>
                                    <button className=" btn btn-special" style={{boxShadow:'none'}}>Claim rewards</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="proposals my-5">
            <div className="container">
                <div className="card lota-card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-md-6">
                                <h3>Proposals</h3>
                            </div>
                            <div className="col-md-6 text-end">
                                <button className="btn btn-default">Create proposal</button>
                            </div>
                        </div>
                        
                        
                    </div>
                    <div className="card-body">
                        {/* Start item */}
                        <div className="proposal-item">
                            <div className="row">
                                    <div className="col-12">
                                        <h4>Proposal title</h4>
                                        <p className="desc">New upcoming design for LoTerra frontend interface preview here https://drive.google.com/file/d/1JDVwEVQLjQSASunLgb6rXu2QPvvEm2k3/view?usp=drivesdk</p>
                                    </div>
                                    <div className="col-md-8">
                                            <table className="table">
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
                                            </table>
                                    </div>
                                    <div className="col-md-4 text-center d-flex">
                                        <div className="vote-box align-self-center w-100">
                                            <h5>Vote</h5>
                                            <div className="btn-group w-100">
                                                <button className="btn btn-default">Yes</button>
                                                <button className="btn btn-default">No</button>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        {/* End item */}
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}