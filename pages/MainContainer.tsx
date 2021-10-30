import React, { Fragment, useState } from 'react'
import {Transition} from '@headlessui/react';
import Link from 'next/link'
import {FaGithub, FaLinkedin} from 'react-icons/fa'
import {TiDocumentText} from 'react-icons/ti'
import Image from 'next/image'
import profileImage from '../public/static/images/profile.jpg'
import dynamic from 'next/dynamic';

const DynamicRenderer=dynamic(
    ()=> import('../components/GLRenderer'),
    {ssr:false}
)

const MainContainer:React.FC<{}>=()=>{
    const [showMe, setShowMe] = useState(true)
    return <>
        <div className="z-0 absolute flex box-content items-center justify-center w-screen h-screen pointer-events-none">
            <Transition
              as={Fragment}
              appear={true}
              show={showMe}
              enter="transform transition duration-1000"
              enterFrom="-translate-y-full opacity-0 scale-50"
              enterTo="translate-y-0 opacity-100 scale-100" 
              leave="transform duration-1000"
              leaveFrom="translate-y-0 opacity-100 scale-100"
              leaveTo="-translate-y-full opacity-0 scale-50"
            >
                <div className="select-none pointer-events-auto relative px-5 py-10 text-center bg-green-300 shadow-2xl md:pt-16 rounded-2xl">
                <DynamicRenderer />
                    <div className="absolute top-0 w-20 h-20 overflow-hidden border-2 border-gray-100 rounded-full shadow-xl transform -translate-x-1/2 -translate-y-1/2 left-1/2 sm:border-6">
                        <Image className="filter brightness-125" src={profileImage} layout="responsive" alt="The creator Sasank" />
                    </div>
                    <h1 className="relative mb-5 text-3xl text-center border-b-2 border-black lg:text-3xl">
                        Sashank Thapa
                    </h1>
                    <button onClick={()=>setShowMe(false)} className="w-full hover:bg-purple-200 p-2 mb-3 rounded-lg cursor-pointer transition-colors shadow-sm bg-blue-50">
                        <a>/me</a>
                    </button>
                    <Link href="/convexhull" passHref>    
                        <button className="w-full p-2 mb-3 rounded-lg cursor-pointer hover:bg-purple-200 transition-colors shadow-sm bg-blue-50">
                            <a>/convexhull</a>
                        </button>
                    </Link>   
                    <div className="flex flex-row items-center justify-center w-full mt-2 gap-10 md:gap-3">
                        <Link href="https://sasank.codes/assets/resume.pdf"><a target="_blank" rel="noreferrer"><TiDocumentText className="m-1 text-xl lg:text-2xl"/></a></Link>
                        <Link href="https://github.com/sasankthapa"><a target="_blank" rel="noreferrer"><FaGithub className="m-1 text-xl lg:text-2xl"/></a></Link>
                        <Link href="https://linkedin.com/in/sasank-t-b815b1104/"><a target="_blank" rel="noreferrer"><FaLinkedin className="m-1 text-xl lg:text-2xl"/></a></Link>
                    </div>
                </div>
            </Transition>
        </div>
    </>
}

export default MainContainer;
