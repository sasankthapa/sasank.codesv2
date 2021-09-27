import React, { Fragment, useState } from 'react'
import {Transition} from '@headlessui/react';
import Link from 'next/link';
import {useRouter} from 'next/router'

const MainContainer:React.FC<{}>=()=>{
    const router=useRouter()
    
    const onClick=(href:string)=>{
        router.push(href)

    }
    
    return <div className="relative flex items-center justify-center w-screen h-screen ">
        <Transition
          as={Fragment}
          appear={true}
          show={true}
          enter="transform transition duration-1000"
          enterFrom="-translate-y-full opacity-0 scale-50"
          enterTo="translate-y-0 opacity-100 scale-100" 
        >
            <div className="p-2 text-center bg-blue-100 shadow-xl md:p-10 rounded-2xl">
                <h1 className="mb-3 lg:text-2xl">
                    Sashank Thapa
                </h1>
                <div className="w-full rounded-lg shadow-sm bg-blue-50">
                    <a onClick={()=>onClick('/simple')}>sasank.codes/simple</a>
                </div>
                <div className="w-full text-red-100 rounded-lg shadow-sm bg-blue-50">
                    <a onClick={()=>onClick('/purecss')}>sasank.codes/purecss</a>
                </div>
            </div>
        </Transition>
    </div>
}

export default MainContainer;
