import React from 'react';
import Header from './Header';
import Recent from './Recents';

interface MainEntryProps{
    recentData:Array<any>
}

const Main:React.FC<MainEntryProps>=({recentData})=>{
    console.log(recentData)
    return <div className="px-2 mt-2 text-center md:mt-5 lg:mt-10 sm:px-16 md:px-32 lg:px-52">
      <Header />
      <Recent items={recentData}/>
    </div>
}

export default Main;
