import {OrbitControls} from '@react-three/drei';
import {Canvas} from '@react-three/fiber';
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
        <OrbitControls />
        <ambientLight intensity={0.5}/>
        <Suspense fallback={null}>
            <Euclid points={points} hull={points.slice(0,3)}/>
            {/*<Plane />*/}
        </Suspense>
    </Canvas>
}

export default CustomCanvas;
