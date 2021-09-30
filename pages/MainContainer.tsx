import React, { Fragment } from 'react'
import {Transition} from '@headlessui/react';
import Link from 'next/link'
import {FaGithub, FaLinkedin} from 'react-icons/fa'
import {TiDocumentText} from 'react-icons/ti'
import {SiLeetcode} from 'react-icons/si'

const MainContainer:React.FC<{}>=()=>{
    return <div className="relative flex items-start justify-center w-screen h-screen bg-gray-300 md:items-center ">
        <Transition
          as={Fragment}
          appear={true}
          show={true}
          enter="transform transition duration-1000"
          enterFrom="-translate-y-full opacity-0 scale-50"
          enterTo="translate-y-0 opacity-100 scale-100" 
        >
            <div className="p-2 py-8 text-center md:shadow-xl md:bg-blue-100 md:p-10 rounded-2xl">
                <h1 className="relative mb-5 text-3xl text-center border-b-2 border-black lg:text-3xl">
                    Sashank Thapa
                </h1>
                <div className="w-full p-2 mb-3 rounded-lg cursor-pointer hover:bg-blue-300 transition-colors shadow-sm bg-blue-50">
                    <Link href="simple"><a>sasank.codes/work</a></Link>
                </div>
                <div className="w-full p-2 mb-3 rounded-lg cursor-pointer hover:bg-blue-300 transition-colors shadow-sm bg-blue-50">
                    <Link href="convexhull"><a>sasank.codes/convexhull</a></Link>
                </div>
                <div className="flex flex-col items-center justify-center w-full md:flex-row gap-3">
                    <Link href="https://github.com/sasankthapa"><a target="_blank" rel="noreferrer"><FaGithub className="my-1 text-xl lg:text-2xl"/></a></Link>
                    <Link href="https://leetcode.com/sasankthapa"><a target="_blank" rel="noreferrer"><SiLeetcode className="my-1 text-xl lg:text-2xl"/></a></Link>
                    <Link href="https://linkedin.com/in/sasank-t-b815b1104/"><a target="_blank" rel="noreferrer"><FaLinkedin className="my-1 text-xl lg:text-2xl"/></a></Link>
                </div>
            </div>
        </Transition>
    </div>
}

export default MainContainer;
