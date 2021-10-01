import React, { Fragment } from 'react';
import {Transition} from '@headlessui/react';

interface AnimationProps{
    delay?:number
}

export const SlideFromRight:React.FC<AnimationProps>=(props)=>{
    const toSet=props.delay?props.delay:0;
    return <Transition
          as={Fragment}
          appear={true}
          show={true}
          enter={`delay-${toSet} transform duration-1000`}
          enterFrom="translate-x-full opacity-0"
          enterTo="translate-x-0 opacity-100" 
        >
        {props.children}
    </Transition>
}

export const SlideFromTop:React.FC<AnimationProps>=(props)=>{
    const toSet=props.delay?props.delay:0;
    return <Transition
          as={Fragment}
          appear={true}
          show={true}
          enter={`delay-${toSet} transform transition duration-1000`}
          enterFrom="translate-y-full opacity-0"
          enterTo="translate-y-0 opacity-100" 
        >
        {props.children}
    </Transition>
}
