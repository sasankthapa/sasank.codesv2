import React from 'react'
import ThreedButton from '../../assets/ThreedButton'

interface ButtonHolderProps{
}

const ButtonHolder:React.FC<ButtonHolderProps>=()=>{
    return <>
        <div className="flex justify-start px-2 bg-blue-500 rounded-full cursor-pointer">
            <ThreedButton className="w-4 h-4"/>
        </div>
    </>
}

export default ButtonHolder;
