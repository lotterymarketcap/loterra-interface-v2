import React, { Component, Suspense } from 'react'
import { Root, Routes } from 'react-static'
import { Router, Link } from '@reach/router'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import './styles/base.scss'
import {Head} from "react-static";
import { popper } from '@popperjs/core'
const { Provider } = React.createContext();

let bootstrap = {}
if (typeof document !== 'undefined') {
    bootstrap = require('bootstrap')
}

class App extends Component {
  render() {
    return (
        <Provider value={{hello: "hello"}}>
            <Suspense fallback={<div>Loading... </div>}>
                <Root>
                    <Head>
                        <meta charSet="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, shrink-to-fit=no"/>
                        <title>LoTerra interface</title>
                        <meta property="og:title" content="LoTerra" />
                        <meta property="og:image" content="https://loterra.io/loterra.png" />
                        <meta property="og:image:alt" content="LoTerra icon" />
                        <meta property="og:type" content="website" />
                        <meta property="og:site_name" content="LoTerra interface" />
                        <meta property="og:description" content="LoTerra is building a lottery gaming ecosystem thanks smart contracts on Terra blockchain."/>
                    </Head>
                  <Navbar/>

                      <Routes default />

                  {/*<Footer/>*/}
                </Root>
            </Suspense>
        </Provider>
    )
  }
}

export default App
