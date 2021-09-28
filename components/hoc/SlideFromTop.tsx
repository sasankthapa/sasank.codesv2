import React, { Fragment, useState, useEffect } from 'react';
import {Transition} from '@headlessui/react';

interface SlideFromTopProps{
    delay?:number;
}

const SlideFromTop:React.FC<SlideFromTopProps>=({delay,children})=>{
    const [show,setShow]=useState(false);

    useEffect(()=>{
        if(delay)
            setTimeout(()=>setShow(true),delay*500)
        else
            setShow(true)
    },[])

    return <Transition
          as={Fragment}
          show={show}
          enter="transform transition duration-1000"
          enterFrom="-translate-y-full opacity-0 scale-50"
          enterTo="translate-y-0 opacity-100 scale-100" 
        >
        {children}
    </Transition>
}

export default SlideFromTop;
