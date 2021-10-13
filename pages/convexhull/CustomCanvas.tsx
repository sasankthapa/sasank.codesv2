import {Canvas,extend, ThreeEvent} from '@react-three/fiber';
import React, {useState, useEffect, Suspense, DragEventHandler} from 'react'
import { Vector2 } from 'three';
import {CustomCanvasProps} from '../../types/convexhull/app.types';
import Euclid from './Euclid';

const CustomCanvas:React.FC<CustomCanvasProps>=({points,lines})=>{
    useEffect(()=>{
    },[])

    return <Canvas camera={{position:[0,0,10]}}
            className='w-full h-full'>
        <ambientLight intensity={1}/>
        <Suspense fallback={null}>
            <Euclid points={points} hull={points.slice(0,3)}/>
        </Suspense>
    </Canvas>
}

export default CustomCanvas;
