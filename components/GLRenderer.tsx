import { Html } from '@react-three/drei';
import {Canvas, MeshProps, useFrame} from '@react-three/fiber';
import React, { useRef, useState }  from 'react'
import { Mesh } from 'three';
import BackgroundPlane from '../components/BackgroundPlane';

const Box=(props:MeshProps)=>{
    const [hovered,setHovered]=useState(false)
    const [hold,setHold]=useState(false)
    const ref=useRef<Mesh>(null);
    
    useFrame((state,delta)=>{
        if(ref.current){
            ref.current.rotation.x+=0.01;
        }
    })

    return <mesh onPointerDown={()=>setHold(true)} onPointerOver={()=>setHovered(true)} onPointerOut={()=>setHovered(false)} ref={ref} {...props}>
            <Html transform sprite>
                <div className="bg-red-100">hello testing</div>
            </Html>
        <boxGeometry args={[1,1,1]}/>
        <meshToonMaterial color={0xff0000} />
    </mesh>
}

const GLRenderer = () => {
    return <div className="z-10 absolute top-0 left-0">
        <Canvas className="w-full h-full">
            <ambientLight intensity={0.6}/>
            <Box />
            {//<BackgroundPlane z={10}/>
            }
        </Canvas>
    </div>
}

export default GLRenderer;
