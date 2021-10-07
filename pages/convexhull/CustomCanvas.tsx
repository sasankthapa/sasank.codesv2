import * as THREE from 'three';
import {OrbitControls} from '@react-three/drei';
import {Canvas, RootState} from '@react-three/fiber';
import React, {useState, useEffect, Suspense} from 'react'
import {CustomCanvasProps} from '../../types/convexhull/app.types';

const Plane:React.FC<{}>=()=>{
    return <mesh position={[0,0,0]}>
            <planeGeometry attach="geometry" args={[10,10]}/>
            <meshStandardMaterial color={0xffffff} />
        </mesh>
}

const CustomCanvas:React.FC<CustomCanvasProps>=({points,lines})=>{
    const [clientSide,setClientSide]=useState(false);

    const handleCreated=(state:RootState)=>{
        console.log(state.size)
    }

    useEffect(()=>{
        if(process.browser){
            setClientSide(true)
        }
    },[])

    const PointBuffer=(new THREE.BufferGeometry()).setFromPoints(points)

    return <>{ clientSide? <Canvas camera={{position:[0,0,10]}} className="w-full h-full" onCreated={handleCreated}>
            <ambientLight intensity={0.5}/>
            <Suspense fallback={null}>
                <points geometry={PointBuffer}>
                    <pointsMaterial attach="material"/>
                </points>
                {/*<Plane />*/}
            </Suspense>
        </Canvas>:
        null}
    </>
}

export default CustomCanvas;
