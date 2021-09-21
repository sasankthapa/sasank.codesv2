import React from 'react'
import Header from './Header'
import Body from './Body';

interface MainEntryProps{
}

const Main:React.FC<MainEntryProps>=()=>{
    return <div className="mx-5 sm:mx-10">
      <Header />
      <Body />
    </div>
}

export default Main;
