import React from 'react'
import Image from 'next/image';
import profileImage from '../public/profile.jpg'

const Header = () => {
    return <div className="flex pt-4 text-center lg:px-36 xl:px-48">
        <h1 className="flex-grow mt-7 text-9xl">Sasank Thapa</h1>
        <div className="overflow-hidden rounded-full lg:h-44 lg:w-44">
            <Image src={profileImage} layout={"responsive"} alt="The creator Sasank" />
        </div>
    </div>
}

export default Header;
