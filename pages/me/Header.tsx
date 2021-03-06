import React from 'react';
import Image from 'next/image';
import profileImage from '../../public/static/images/profile.jpg'

const HeaderContainer = () => {
    return <header className="flex pb-2 text-center border-b-2 border-gray-500 xl:pb-5 sm:mt-0 transition-all ">
        <h1 className="flex items-center justify-center flex-grow flex-shrink mt-2 text-4xl sm:text-5xl lg:text-7xl 2xl:text-9xl">Sasank Thapa</h1>
        <div className="flex content-center justify-center h-full pd-2">
            <div className="w-16 h-16 overflow-hidden border-2 border-gray-100 rounded-full shadow-md transition-all sm:border-6 md:w-32 md:h-32">
                <Image className="filter brightness-110" src={profileImage} layout="responsive" alt="The creator Sasank" />
            </div>
        </div>
    </header>
}

export default HeaderContainer;
