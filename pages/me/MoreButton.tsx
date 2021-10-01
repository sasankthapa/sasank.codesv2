import React, {useState, useEffect, Fragment} from 'react';
import {Transition} from '@headlessui/react';

interface MoreButtonProps{
    clicked:()=>void,
}

const MoreButton:React.FC<MoreButtonProps>=({clicked})=>{
    const [show,setShow]=useState(false)

    useEffect(()=>{
        setTimeout(()=>setShow(true), 5000)
    },[])

    return <Transition
          className="text-center"
          show={show}
          enter={`transform transition duration-1000`}
          enterFrom="translate-y-1/2 opacity-0"
          enterTo="translate-y-0 opacity-100" 
          leave="transition-opacity duration-1000"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
            <button className="py-4 mt-6 bg-blue-300 rounded-lg px-7" onClick={clicked}>Show More</button>
        </Transition>
}

export default MoreButton;
