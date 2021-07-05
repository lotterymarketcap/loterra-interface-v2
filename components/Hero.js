
import hero from '../styles/components/Hero.module.scss';
import HeroBg from '../images/herobg.js';
import { Ticket, Users } from "phosphor-react";
import { renderToStaticMarkup } from 'react-dom/server';


export default function Hero(){

    const svgString = encodeURIComponent(renderToStaticMarkup(<HeroBg />));
    const dataUri = `url("data:image/svg+xml,${svgString}")`;

    return(
        <div className={hero.main} style={{backgroundImage: dataUri, backgroundSize:'cover', backgroundPosition:'bottom'}}>
            <div className={hero.container}>
                <p className={hero.title}>Jackpot</p>
                <div className={hero.jackpot_price}>
                    <p>126,257.94 <span>UST</span></p>
                </div>
                <div className={hero.stats}>
                    <div className="w6">
                        <div className="lota-card">
                            <div className="w4 center">
                                <Ticket color="#20FF93" weight="regular" size={50} />
                            </div>
                            <div className="w8">
                                <span>Tickets sold</span>
                                <p>3 444 555</p>
                            </div>
                        </div>
                    </div>
                    <div className="w6">
                        <div className="lota-card">
                            <div className="w4 center">
                                <Users color="#20FF93" weight="regular" size={50} />
                            </div>
                            <div className="w8">
                                <span>Tickets sold</span>
                                <p>3 444 555</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
                <button className="pink">Buy tickets</button>
       
        </div>
    )
}