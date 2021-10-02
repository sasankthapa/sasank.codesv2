import React from 'react'

interface ButtonHolderProps{
}

const ButtonHolder:React.FC<ButtonHolderProps>=()=>{
    return <>
        <div className="flex justify-start px-2 bg-blue-500 rounded-full cursor-pointer">
        </div>
    </>
}

export default ButtonHolder;
