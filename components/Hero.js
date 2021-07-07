
import hero from '../styles/components/Hero.module.scss';
import combinations from '../styles/components/CombinationMaker.module.scss'
import HeroBg from '../images/herobg.js';

import JackpotCounter from '../components/JackpotCounter';

import { Ticket, Users, Backspace, X } from "phosphor-react";
import { renderToStaticMarkup } from 'react-dom/server';

import React from 'react';



export default function Hero(){

    let modal = false;

    const [modalIsOpen,setIsOpen] = React.useState(false);


    const svgString = encodeURIComponent(renderToStaticMarkup(<HeroBg />));
    const dataUri = `url("data:image/svg+xml,${svgString}")`;

    const toggleModal = () => setIsOpen(!modalIsOpen)

    return(
        <div className={hero.main} style={{backgroundImage: dataUri, backgroundSize:'cover', backgroundPosition:'bottom'}}>
            <div className={hero.container}>
                <p className={hero.title}>Jackpot</p>
                <div className={hero.jackpot_price}>
                    <p>126,257.94 <span>UST</span></p>
                </div>
                <div className={hero.stats}>
                    <div className="ww6">
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
                    <div className="ww6">
                        <div className="lota-card">
                            <div className="w4 center">
                                <Users color="#20FF93" weight="regular" size={50} />
                            </div>
                            <div className="w8">
                                <span>Players</span>
                                <p>122 444</p>
                            </div>
                        </div>
                    </div>
                </div>
            <JackpotCounter/>
            </div>

           
                <button className={hero.buy_btn} onClick={() => toggleModal()}>Buy tickets</button>

                <div className={modalIsOpen ? hero.modal_show : hero.modal}>
                    
                    <div className={combinations.container}>
                    <h2>Buy tickets</h2>
                    <h3>Create your own combinations</h3>
                    <button className={combinations.toggle_modal} onClick={() => toggleModal()}><X size={36} /></button>
                        <div className={combinations.display}>
                            <span>1</span>
                            <span>1</span>
                            <span>1</span>
                            <span>1</span>
                            <span>1</span>
                            <span>1</span>
                        </div>
                        <div className={combinations.buttons}>
                            <button>a</button>
                            <button>b</button>
                            <button>c</button>
                            <button>d</button>
                            <button>e</button>
                            <button>f</button>
                            <button>0</button>
                            <button>1</button>
                            <button>2</button>
                            <button>3</button>
                            <button>4</button>
                            <button>5</button>
                            <button>6</button>
                            <button>7</button>
                            <button>8</button>
                            <button>9</button>
                            <button className={combinations.buttons_large}><Backspace size={48} /></button>
                            <button className={combinations.buttons_large_special}>Random</button>
                            <button className={combinations.buttons_large_special}>X10</button>
                            <button className={combinations.buttons_large_special}>X100</button>
                        </div>
                    </div>
                    <button className={hero.buy_btn} >Buy tickets</button>
                </div>
                <div className={modalIsOpen ? hero.backdrop_show : hero.backdrop} onClick={() => toggleModal()}></div>
        </div>
    )
}