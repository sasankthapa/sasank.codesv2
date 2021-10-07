import React, { Fragment } from 'react'
import {Transition} from '@headlessui/react';
import Link from 'next/link'
import {FaGithub, FaLinkedin} from 'react-icons/fa'
import {TiDocumentText} from 'react-icons/ti'
import {SiLeetcode} from 'react-icons/si'
import Image from 'next/image'
import profileImage from '../public/static/images/profile.jpg'

const MainContainer:React.FC<{}>=()=>{
    return <div className="relative flex items-start items-center justify-center w-screen h-screen bg-gray-300">
        <Transition
          as={Fragment}
          appear={true}
          show={true}
          enter="transform transition duration-1000"
          enterFrom="-translate-y-full opacity-0 scale-50"
          enterTo="translate-y-0 opacity-100 scale-100" 
        >
            <div className="relative px-5 py-10 text-center bg-blue-300 md:shadow-xl md:pt-16 rounded-2xl">
                <div className="absolute top-0 w-20 h-20 overflow-hidden border-2 border-gray-100 rounded-full shadow-xl transform -translate-x-1/2 -translate-y-1/2 left-1/2 sm:border-6">
                    <Image className="filter brightness-110" src={profileImage} layout="responsive" alt="The creator Sasank" />
                </div>
                <h1 className="relative mb-5 text-3xl text-center border-b-2 border-black lg:text-3xl">
                    Sashank Thapa
                </h1>
                <button className="w-full p-2 mb-3 rounded-lg cursor-pointer hover:bg-green-400 transition-colors shadow-sm bg-blue-50">
                    <Link href="me"><a>/work</a></Link>
                </button>
                <button className="w-full p-2 mb-3 rounded-lg cursor-pointer hover:bg-green-400 transition-colors shadow-sm bg-blue-50">
                    <Link href="convexhull"><a>/convexhull</a></Link>
                </button>
                <div className="flex flex-row items-center justify-center w-full mt-2 gap-10 md:gap-3">
                    <Link href="https://sasank.codes/assets/resume.pdf"><a target="_blank" rel="noreferrer"><TiDocumentText className="m-1 text-xl lg:text-2xl"/></a></Link>
                    <Link href="https://github.com/sasankthapa"><a target="_blank" rel="noreferrer"><FaGithub className="m-1 text-xl lg:text-2xl"/></a></Link>
                    <Link href="https://leetcode.com/sasankthapa"><a target="_blank" rel="noreferrer"><SiLeetcode className="m-1 text-xl lg:text-2xl"/></a></Link>
                    <Link href="https://linkedin.com/in/sasank-t-b815b1104/"><a target="_blank" rel="noreferrer"><FaLinkedin className="m-1 text-xl lg:text-2xl"/></a></Link>
                </div>
            </div>
        </Transition>
    </div>
}

export default MainContainer;
