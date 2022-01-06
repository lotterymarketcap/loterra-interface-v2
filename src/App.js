import React, { Component, Suspense, useContext } from 'react'
import { Root, Routes } from 'react-static'
import { Router, Link } from '@reach/router'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import './styles/base.scss'
import { Head } from 'react-static'
import { popper } from '@popperjs/core'




let bootstrap = {}
if (typeof document !== 'undefined') {
    bootstrap = require('bootstrap')
}
import { StoreProvider } from './store'
import ConnectWallet from './components/ConnectWallet'
import NormalNav from './components/NormalNav'
import { List } from 'phosphor-react'

if(window !== undefined){
    window.addEventListener('DOMContentLoaded', event => {
        // Toggle the side navigation
        const sidebarToggle = document.body.querySelector('#sidebarToggle');
        if (sidebarToggle) {
            // Uncomment Below to persist sidebar toggle between refreshes
            // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
            //     document.body.classList.toggle('sb-sidenav-toggled');
            // }
            sidebarToggle.addEventListener('click', event => {
                event.preventDefault();
                document.body.classList.toggle('sb-sidenav-toggled');      
                localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
            });
        }

    
    });

    
}


class App extends Component {



    render() {
        return (
            <Suspense
                fallback={
                    <div className="vh-100 d-flex">
                        <div className="align-self-center w-100 text-center">
                            <img src="logo.png" className="img-fluid mb-4" />
                            <p
                                style={{
                                    color: '#f038f0',
                                    textTransform: 'uppercase',
                                    fontSize: '36px',
                                    fontWeight: '300',
                                    textShadow: '0px 0px 26px #ff36ff',
                                    fontFamily: "'Monoton', cursive",
                                }}
                                className="loading_animation"
                            >
                                Loading...{' '}
                            </p>
                        </div>
                    </div>
                }
            >
                <Root>
                    <Head>
                        <meta charSet="UTF-8" />
                        <meta
                            name="viewport"
                            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                        />
                        <title>
                            LoTerra - Decentralized lottery on Terra blockchain
                        </title>
                        <link
                            rel="icon"
                            type="image/x-icon"
                            href="https://loterra.io/favicon.ico"
                        />
                        <link
                            data-hid="shortcut-icon"
                            rel="shortcut icon"
                            href="https://loterra.io/favicon.ico"
                        />
                        <meta property="og:title" content="LoTerra" />
                        <meta
                            property="og:image"
                            content="https://loterra.io/loterra.png"
                        />
                        <meta property="og:image:alt" content="LoTerra icon" />
                        <meta property="og:type" content="website" />
                        <meta
                            property="og:site_name"
                            content="LoTerra interface"
                        />
                        <meta
                            property="og:description"
                            content="LoTerra is a lottery contract, buy tickets as a player or join the governance! DAO allows making decisions together! Manage the casino 🎰 Set the prize 🏆 Up the ticket price or go cheap 🏷 Extract max profits 🤑 Keep the vault secure at all times!"
                        />
                        <meta name="twitter:card" content="summary" />
                        <meta name="twitter:site" content="LoTerra" />
                        <meta
                            name="twitter:title "
                            content="LoTerra - Decentralized lottery on Terra blockchain"
                        />
                        <meta
                            name="twitter:description"
                            content="LoTerra is a lottery contract, buy tickets as a player or join the governance! DAO allows making decisions together! Manage the casino 🎰 Set the prize 🏆 Up the ticket price or go cheap 🏷 Extract max profits 🤑 Keep the vault secure at all times!"
                        />
                        <meta
                            name="twitter:image"
                            content="https://loterra.io/loterra.png"
                        />
                        <script
                            src="https://widgets.coingecko.com/coingecko-coin-price-chart-widget.js"
                            async
                        />
                    </Head>
                    <StoreProvider>
                    <div className="d-flex" id="wrapper">
                        <div id="sidebar-wrapper" className="sticky-top">
                            <NormalNav />
                        </div>
                        <div id="page-content-wrapper" >
                        <nav className="navbar navbar-expand navbar-light sticky-top" id="smallNav">
                    <div className="container-fluid">
                        <button className="btn btn-default" id="sidebarToggle"> <List size={26} /></button>
                        <div className="navbar">
                        <ConnectWallet/>
                        </div>
                    </div>
                </nav>
                            <Routes default />
                        </div>
                    </div>
                    </StoreProvider>

                    {/*<Footer/>*/}
                </Root>
            </Suspense>
        )
    }
}

export default App
