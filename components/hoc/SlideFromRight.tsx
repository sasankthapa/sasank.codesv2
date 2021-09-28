import React, { Fragment, useState, useEffect } from 'react';
import {Transition} from '@headlessui/react';

interface SlideFromTopProps{
    delay?:number;
}

const SlideFromTop:React.FC<SlideFromTopProps>=({delay,children})=>{
    const [show,setShow]=useState(false);

    return <Transition
          as={Fragment}
          appear={true}
          show={true}
          enter={`delay-${delay} transform transition duration-1000`}
          enterFrom="translate-x-full opacity-0"
          enterTo="translate-x-0 opacity-100" 
        >
        {children}
    </Transition>
}

export default SlideFromTop;
