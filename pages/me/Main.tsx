import React, {Fragment, useState} from 'react';
import Header from './Header';
import dynamic from 'next/dynamic';
import MoreButton from './MoreButton';
import {StaticProps} from '../../types/main.types'
import { Transition } from '@headlessui/react';

const DynamicContent=dynamic(
    ()=>import('../../components/CustomTabs'),
    {ssr:false}
)

const Main:React.FC<StaticProps>=({recent,frontend,ml,algo})=>{
    const [showTabs,setShowTabs]=useState(false);

    return <div className="p-2 overflow-hidden min-h-32 font-inter sm:px-16 md:pt-4 md:px-32 lg:px-52 xl:px-60 2xl:px-80 2xl:pt-10">
      <Header/>
        <Transition
          as={Fragment}
          appear={true}
          show={true}
          enter={`delay-0 transform duration-1000`}
          enterFrom="translate-x-full opacity-0"
          enterTo="translate-x-0 opacity-100" 
        >
          <div className="mt-10 w-full text-left md:text-base xl:text-xl md:mt-6 xl:mt-10">
              <h1 className="inline font-bold xl:leading-8">{'About me: '}</h1>
              <p className="inline">I am a passionate computer scientist, problem solver and developer. I enjoy creating complex, scalable, and fast web apps. </p>
          </div>
      </Transition>
      {showTabs?<DynamicContent recent={recent} frontend={frontend} ml={ml} algo={algo}/>:
      <MoreButton clicked={()=>setShowTabs(true)}/>}
    </div>
}

export default Main;
