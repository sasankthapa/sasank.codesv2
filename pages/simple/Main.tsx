import React, {useState} from 'react';
import Header from './Header';
import dynamic from 'next/dynamic';
import Recent from '../../components/Recents';

const DynamicContent=dynamic(
    ()=>import('../../components/Recents'),
    {ssr:false}
)

const Main:React.FC<StaticProps>=({recent,frontend,ml})=>{
    const [threeMode,setThreeMode]=useState(false)
    const [darkMode,setDarkMode]=useState(false)

    return <div className="px-2 pt-4 text-center sm:px-16 md:px-32 lg:px-52">
      <Header/>
      <DynamicContent items={recent}/>
      {/*<Recent items={recent}/>*/}
    </div>
}

export default Main;
