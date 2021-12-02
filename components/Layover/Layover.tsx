import React, { useState } from 'react'
import Link from 'next/link'
import { FaGithub } from 'react-icons/fa';

interface LayoverProps{
    github:string
}

const Layover:React.FC<LayoverProps> = ({github}) => {
    const [hovered,setHovered] = useState(false)
    return (
        <div className="absolute top-0 left-0 z-50 flex w-screen h-screen justify-end pointer-events-none items-end overflow-hidden">
            <div onPointerOver={()=>setHovered(true)} 
                    onPointerLeave={()=>setHovered(false)}
                    className="relative m-5 cursor-pointer pointer-events-auto">
                {hovered && <p className="absolute top-0 left-0 transform -translate-y-full">View on Github</p>}
                <Link href={github}><a target="_blank" rel="noreferrer"><FaGithub className="text-white text-4xl"/></a></Link>
            </div>
        </div>
    )
}

export default Layover;
