
import styles from '../styles/components/LoterraStats.module.scss'
import { Trophy } from "phosphor-react";

export default function LoterraStats(){
    return(
        <div className="lota-card mt-4">
            <div className={styles.stats}>
                <div className={styles.icon}><Trophy color="#20FF93" weight="regular" size={88} /></div>
                    <h2 className="center">Some title <span>Current Lottery</span></h2>
                        <div className="w4 center">
                            Test
                        </div>
                        <div className="w4 center">
                            Test
                        </div>
                        <div className="w4 center">
                            Test
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