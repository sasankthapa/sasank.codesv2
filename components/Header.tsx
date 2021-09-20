import React from 'react'
import Image from 'next/image';
import profileImage from '../public/profile.jpg'

const HeaderContainer = () => {
    return <header className="flex pt-4 text-center sm:px-20 lg:px-36 xl:px-48">
        <h1 className="flex-grow flex-shrink text-3xl lg:text-9xl">Sasank Thapa</h1>
        <div className="relative w-auto h-auto overflow-hidden sm:w-44 sm:h-w44">
            <Image src={profileImage} layout="intrinsic" alt="The creator Sasank" />
        </div>
        </header>
}

export default HeaderContainer;
