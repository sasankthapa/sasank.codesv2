import {Canvas,extend} from '@react-three/fiber';
import React, {useState, useEffect, Suspense} from 'react'
import {CustomCanvasProps} from '../../types/convexhull/app.types';
import Euclid from './Euclid';

const CustomCanvas:React.FC<CustomCanvasProps>=({points,lines})=>{
    const [clientSide,setClientSide]=useState(false);

    useEffect(()=>{
        if(process.browser){
            setClientSide(true)
        }
    },[])

    return <Canvas camera={{position:[0,0,10]}}
            className="w-full h-full">
        <ambientLight intensity={1}/>
        <Suspense fallback={null}>
            <Euclid points={points} hull={points.slice(0,3)}/>
        </Suspense>
    </Canvas>
}

export default CustomCanvas;
