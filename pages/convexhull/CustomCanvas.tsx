import { Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { useEffect, Suspense } from 'react'
import Background from '../../components/Background';
import Loading from '../../components/Loading';
import { CustomCanvasProps } from '../../types/convexhull/app.types';
import Euclid from './Euclid';

const CustomCanvas: React.FC<CustomCanvasProps> = ({ data, planeArgs }) => {
    useEffect(() => {
    }, [])

    return <Canvas onCreated={({gl})=>{
            gl.setClearColor(0x333333)
        }}camera={{ position: [0, 0, 50] }}
        className='w-full h-full'>
        <ambientLight intensity={0.8} />
        <Background />
        <Suspense fallback={<Loading />}>
            <Euclid pointsData={data.pointsData} pointData={data.pointData} linesData={data.linesData} planeArgs={planeArgs} />
        </Suspense>
    </Canvas>
}

export default CustomCanvas;
