import {Canvas, useFrame} from '@react-three/fiber';
import React, { useEffect, Suspense, useRef} from 'react'
import { Mesh } from 'three';
import {CustomCanvasProps} from '../../types/convexhull/app.types';
import Euclid from './Euclid';

const Loading=()=>{
    const ref=useRef<Mesh>(null)

    useFrame(()=>{
        if(ref.current){
            ref.current.rotation.x+=.2;
            ref.current.rotation.z+=.2;
        }
    })

    return <mesh ref={ref}>
        <boxGeometry attach="geometry" args={[2,2,2]}/>
        <meshNormalMaterial attach="material"/>
    </mesh>
}

const CustomCanvas:React.FC<CustomCanvasProps>=({data,planeArgs})=>{
    useEffect(()=>{
    },[])

    return <Canvas camera={{position:[0,0,50]}}
            className='w-full h-full'>
        <ambientLight intensity={1}/>
        <Suspense fallback={<Loading />}>
            <Euclid pointsData={data.pointsData} pointData={data.pointData} linesData={data.linesData} planeArgs={planeArgs}/>
        </Suspense>
    </Canvas>
}

export default CustomCanvas;
