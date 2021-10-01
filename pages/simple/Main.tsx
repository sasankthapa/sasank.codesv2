import React, {useState} from 'react';
import Header from './Header';
import dynamic from 'next/dynamic';
import {SlideFromRight, SlideFromTop} from '../../components/hoc/SlidesAnimation';
import CustomTabs from './CustomTabs';
import MoreButton from './MoreButton';

const DynamicContent=dynamic(
    ()=>import('./CustomTabs'),
    {ssr:false}
)

const Main:React.FC<StaticProps>=({recent,frontend,ml,algo})=>{
    const [showTabs,setShowTabs]=useState(false);

    return <div className="p-2 overflow-hidden md:pt-4 md:px-32 lg:px-52 xl:px-60 2xl:px-80 2xl:pt-10">
      <Header/>
      <SlideFromRight> 
      <div className="w-full mt-3 text-left md:text-lg md:mt-6 xl:mt-10 2xl:text-2xl">
          <h1 className="inline font-bold xl:leading-8">{'About me: '}</h1>
          <p className="inline">I am a passionate computer science enthusiast, problem solver and a coder.
          I revel in learning new technologies and writing understandable algorithms. 
          </p>
          </div>
      </SlideFromRight>
      {showTabs?<DynamicContent recent={recent} frontend={frontend} ml={ml} algo={algo}/>:
      <MoreButton clicked={()=>setShowTabs(true)}/>}
    </div>
}

export default Main;
