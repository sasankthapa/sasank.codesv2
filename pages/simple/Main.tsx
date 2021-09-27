import React, {useState} from 'react';
import Header from './Header';
import Recent from './Recents';

const Main:React.FC<StaticProps>=({recent,frontend,ml})=>{
    const [threeMode,setThreeMode]=useState(false)
    const [darkMode,setDarkMode]=useState(false)

    return <div className="px-2 mt-2 text-center md:mt-5 lg:mt-10 sm:px-16 md:px-32 lg:px-52">
      <Header/>
      <Recent items={recent}/>
    </div>
}

export default Main;
