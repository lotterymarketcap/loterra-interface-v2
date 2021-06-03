import React, { Component, Suspense } from 'react'
import { Root, Routes } from 'react-static'
import { Router, Link } from '@reach/router'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import './styles/app.css'

class App extends Component {
  render() {
    return (
        <Suspense fallback={<div>Loading... </div>}>
            <Root>
              <Navbar/>
              <div className="content">
                  <Routes default />
              </div>
              {/*<Footer/>*/}
            </Root>
        </Suspense>

    )
  }
}

export default App
