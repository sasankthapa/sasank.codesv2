import React from 'react'
import Image from 'next/image';
import profileImage from '../public/profile.jpg'
import ThreedButton from '../assets/ThreedButton';

const HeaderContainer = () => {
    return <header className="flex pt-4 text-center transition-all sm:px-20 lg:px-36 xl:px-48 2xl:px-72">
        <h1 className="flex items-center justify-center flex-grow flex-shrink mt-2 text-5xl lg:text-7xl">Sasank Thapa</h1>
        <div className="flex flex-col justify-center p-2">
            <div className="h-auto bg-blue-600 rounded-full cursor-pointer w-7">
                <ThreedButton className="w-4 h-4"/>
            </div>
        </div>
        <div className="w-16 h-16 m-2 mt-10 overflow-hidden border-2 border-gray-100 rounded-full shadow-md transform transition-all hover:scale-150 sm:border-6 sm:w-32 sm:h-32">
            <Image src={profileImage} layout="responsive" alt="The creator Sasank" />
        </div>
    </header>
}

export default HeaderContainer;
