import React, {useState} from "react";

import { WhatsappLogo,TwitterLogo,TelegramLogo } from "phosphor-react";

export default function Footer(){    

    return (
        <footer className="container">
            <div className="social-share py-5">
            <p>Stay in touch with <strong>LoTerra</strong></p>
            <ul>                
                <li><a target="_blank" href="https://twitter.com/LoTerra_LOTA"><TwitterLogo size={31} /></a></li>
                <li><a target="_blank" href="https://t.me/LoTerra"><TelegramLogo size={31} /></a></li>
            </ul>
            </div>
        </footer>
    )
}