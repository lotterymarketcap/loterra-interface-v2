import React, { useState } from 'react'
import { WhatsappLogo, TwitterLogo, TelegramLogo } from 'phosphor-react'

export default function SocialShare() {
    return (
        <div className="social-share">
            <p>
                Share <strong>LoTerra</strong> with <strong>friends</strong>
            </p>
            <ul>
                <li>
                    <a
                        target="_blank"
                        href="https://api.whatsapp.com/send?text=Just%20Found%20out%20about%20LoTerra%20https://loterra.io"
                    >
                        <WhatsappLogo size={31} />
                    </a>
                </li>
                <li>
                    <a
                        target="_blank"
                        href="https://twitter.com/share?url=https://loterra.io&text=Just%20Found%20out%20about%20LoTerra%20$LOTA"
                    >
                        <TwitterLogo size={31} />
                    </a>
                </li>
                <li>
                    <a
                        target="_blank"
                        href="https://t.me/share/url?url=https://loterra.io&text=Just%20Found%20out%20about%20LoTerra%20"
                    >
                        <TelegramLogo size={31} />
                    </a>
                </li>
            </ul>
        </div>
    )
}
