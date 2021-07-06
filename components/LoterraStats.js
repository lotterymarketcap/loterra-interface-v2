
import styles from '../styles/components/LoterraStats.module.scss'
import { Trophy } from "phosphor-react";
import {  Line, Pie } from 'react-chartjs-2';

export default function LoterraStats(){

    const lineOptions = {
        responsive:true,
        maintainAspectRatio: false,
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

    const lineData_green = canvas => {

        const ctx = canvas.getContext('2d');  
        let gradientGreen = ctx.createLinearGradient(0, 0, 0, 170);
        gradientGreen.addColorStop(0, '#193250');
        gradientGreen.addColorStop(1, '#181446'); 
      
      
      
        return {
          labels: [75,25,10,21,35,40,77],
       
        datasets: [
          {      
            data: [75,25,10,21,35,40,77],
            fill:true,
            backgroundColor:gradientGreen,
            borderColor: [
              '#20FF93',   
            ],
            pointBackgroundColor: '#20FF93',
            pointBorderColor: '#FFFFFF',
            pointBorderWidth: 2,
            lineTension: .4,
            borderWidth: 4,
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
        gradientGreen.addColorStop(0, '#ED70ED');
        gradientGreen.addColorStop(1, '#B83BB8'); 
    
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
        <div className="lota-card mt-4">
            <div className={styles.stats}>
                <div className={styles.icon}><Trophy color="#20FF93" weight="regular" size={88} /></div>
                    <h2 className="center">Lottery stats <span>Current Lottery</span></h2>
                        <div className="w4 center">
                            <div className={styles.chart}>               
                                <Line data={lineData_green} options={lineOptions} style={{height: '230px'}}/>
                            </div>
                        </div>
                        <div className="w4 center">
                        <Pie data={data} options={{
                            responsive:true,
                            maintainAspectRatio: false
                        }} style={{height: '230px'}}/>
                        </div>
                        <div className="w4 center">
                            
                        </div>
                        <div className="w12">
                            <h3 className="mt-4 w12">Jackpot</h3>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>RANK</th>
                                        <th>SYMBOLS</th>
                                        <th>PRIZES</th>
                                        <th>GROSS</th>
                                        <th>TAX</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="big">#1</td>
                                        <td className="center pink">6 Symbols</td>
                                        <td className="price">0.00 <span>UST</span></td>
                                        <td className="price">0.00 <span>UST</span></td>
                                        <td className="price">0.00 <span>UST</span></td>
                                    </tr>
                                    <tr>
                                        <td className="big">#1</td>
                                        <td className="center pink">6 Symbols</td>
                                        <td className="price">0.00 <span>UST</span></td>
                                        <td className="price">0.00 <span>UST</span></td>
                                        <td className="price">0.00 <span>UST</span></td>
                                    </tr>
                                    <tr>
                                        <td className="big">#1</td>
                                        <td className="center pink">6 Symbols</td>
                                        <td className="price">0.00 <span>UST</span></td>
                                        <td className="price">0.00 <span>UST</span></td>
                                        <td className="price">0.00 <span>UST</span></td>
                                    </tr>
                                    <tr>
                                        <td className="big">#1</td>
                                        <td className="center pink">6 Symbols</td>
                                        <td className="price">0.00 <span>UST</span></td>
                                        <td className="price">0.00 <span>UST</span></td>
                                        <td className="price">0.00 <span>UST</span></td>
                                    </tr>
                                    <tr>
                                        <td className="big">#1</td>
                                        <td className="center pink">6 Symbols</td>
                                        <td className="price">0.00 <span>UST</span></td>
                                        <td className="price">0.00 <span>UST</span></td>
                                        <td className="price">0.00 <span>UST</span></td>
                                    </tr>
                                </tbody>
                            </table>
                            <h3 className="mt-4 w12">Jackpot</h3>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>RANK</th>
                                        <th>SYMBOLS</th>
                                        <th>PRIZES</th>
                                        <th>GROSS</th>
                                        <th>TAX</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="big">#1</td>
                                        <td className="center pink">6 Symbols</td>
                                        <td className="price">0.00 <span>UST</span></td>
                                        <td className="price">0.00 <span>UST</span></td>
                                        <td className="price">0.00 <span>UST</span></td>
                                    </tr>
                                    <tr>
                                        <td className="big">#1</td>
                                        <td className="center pink">6 Symbols</td>
                                        <td className="price">0.00 <span>UST</span></td>
                                        <td className="price">0.00 <span>UST</span></td>
                                        <td className="price">0.00 <span>UST</span></td>
                                    </tr>
                                    <tr>
                                        <td className="big">#1</td>
                                        <td className="center pink">6 Symbols</td>
                                        <td className="price">0.00 <span>UST</span></td>
                                        <td className="price">0.00 <span>UST</span></td>
                                        <td className="price">0.00 <span>UST</span></td>
                                    </tr>
                                    <tr>
                                        <td className="big">#1</td>
                                        <td className="center pink">6 Symbols</td>
                                        <td className="price">0.00 <span>UST</span></td>
                                        <td className="price">0.00 <span>UST</span></td>
                                        <td className="price">0.00 <span>UST</span></td>
                                    </tr>
                                    <tr>
                                        <td className="big">#1</td>
                                        <td className="center pink">6 Symbols</td>
                                        <td className="price">0.00 <span>UST</span></td>
                                        <td className="price">0.00 <span>UST</span></td>
                                        <td className="price">0.00 <span>UST</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
            </div>
        </div>
    )
}