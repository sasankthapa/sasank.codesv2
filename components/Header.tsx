import React from 'react'
import Image from 'next/image';
import profileImage from '../public/profile.jpg'

const HeaderContainer = () => {
    return <header className="flex pt-4 text-center sm:px-20 lg:px-36 xl:px-48">
        <h1 className="flex items-center justify-center flex-grow flex-shrink mt-2 text-5xl lg:text-7xl">Sasank Thapa</h1>
        <div className="flex flex-col justify-center p-10">
            Hello
        </div>
        <div className="w-10 h-10 mt-10 overflow-hidden rounded-full sm:w-32 sm:h-32">
            <Image src={profileImage} layout="responsive" alt="The creator Sasank" />
        </div>
    </header>
}

export default HeaderContainer;
