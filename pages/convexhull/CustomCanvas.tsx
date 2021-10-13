import {Canvas,extend, ThreeEvent} from '@react-three/fiber';
import React, {useState, useEffect, Suspense, DragEventHandler} from 'react'
import { Vector2 } from 'three';
import {CustomCanvasProps} from '../../types/convexhull/app.types';
import Euclid from './Euclid';

const CustomCanvas:React.FC<CustomCanvasProps>=({data})=>{
    useEffect(()=>{
    },[])

    return <Canvas camera={{position:[0,0,10]}}
            className='w-full h-full'>
        <ambientLight intensity={1}/>
        <Suspense fallback={null}>
            <Euclid pointsData={data.pointsData} pointData={data.pointData} linesData={data.linesData} planeArgs={[10,10,10,10]}/>
        </Suspense>
    </Canvas>
}

export default CustomCanvas;
