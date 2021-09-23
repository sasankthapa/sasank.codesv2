import React from 'react'
import Image from 'next/image';
import profileImage from '../public/profile.jpg'
import ThreedButton from '../assets/ThreedButton';

const HeaderContainer = () => {
    return <header className="flex pb-2 mt-10 text-center border-b-2 border-gray-500 sm:mt-0 transition-all ">
        <h1 className="flex items-center justify-start flex-grow flex-shrink mt-2 text-3xl sm:text-5xl md:text-6xl">Sasank Thapa</h1>
        <div className="flex flex-col justify-center p-2 sm:px-10 md:px-16 xl:px-32">
            <div className="hidden h-auto bg-blue-600 rounded-full cursor-pointer md:block w-7">
                <ThreedButton className="w-4 h-4"/>
            </div>
        </div>
        <div className="flex content-center justify-center h-full pd-2">
            <div className="w-16 h-16 overflow-hidden border-2 border-gray-100 rounded-full shadow-md transition-all sm:border-6 md:w-32 md:h-32">
                <Image src={profileImage} layout="responsive" alt="The creator Sasank" />
            </div>
        </div>
    </header>
}

export default HeaderContainer;
