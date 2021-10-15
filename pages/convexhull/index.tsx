import React from 'react'
import {GrahamScan}  from './functions/GrahamScan'
import GrahamScanApp from './GrahamScanApp'

const App = () => {
    return <>
        <GrahamScanApp instance={new GrahamScan()}/>
    </>
}

export default App;
