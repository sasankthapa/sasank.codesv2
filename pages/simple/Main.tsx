import React, {useState} from 'react';
import Header from './Header';
import dynamic from 'next/dynamic';
import {SlideFromRight, SlideFromTop} from '../../components/hoc/SlidesAnimation';
import CustomTabs from './CustomTabs';

const DynamicContent=dynamic(
    ()=>import('../../components/Recents'),
    {ssr:false}
)

const Main:React.FC<StaticProps>=({recent,frontend,ml})=>{
    return <div className="p-2 text-center md:pt-4 md:px-52 xl:px-60 2xl:px-80 2xl:pt-10">
      <Header/>
      <SlideFromRight> 
      <div className="w-full mt-3 text-left md:text-lg md:mt-6 xl:mt-10 2xl:text-2xl">
          <h1 className="inline font-bold">About me:</h1>
          <p>I am a passionate computer science enthusiast, problem solver and a coder.
          I revel in learning new technologies and writing understandable algorithms. 
          </p>
          </div>
      </SlideFromRight>
      <SlideFromTop delay={1000}>
      <CustomTabs recent={recent} frontend={frontend} ml={ml}/>
      </SlideFromTop>
    </div>
}

export default Main;
