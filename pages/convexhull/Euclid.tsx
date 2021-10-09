import * as THREE from 'three';
import {useFrame, useLoader, useThree} from '@react-three/fiber'
import React, {useEffect, useRef, useState} from 'react'
import {EuclidProps} from '../../types/convexhull/app.types'

const Plane:React.FC<{}>=()=>{
    return <mesh>
            <planeGeometry attach="geometry" args={[10,10]}/>
            <meshStandardMaterial color={0xffffff} />
        </mesh>
}

const Euclid:React.FC<EuclidProps>=({points})=>{
    const camera=useThree(state=>state.camera);

    const handleDrag=()=>{
        console.log('her');
    }

    const PointBuffer=(new THREE.BufferGeometry()).setFromPoints(points)
    
    return <group position={[-100,-100,0]}>
        <mesh onPointerMove={(e)=>{console.log(e.movementX)}} position={[100,100,0]}>
            <planeGeometry attach="geometry" args={[100,100,100,100]}/>
            <meshStandardMaterial wireframe={true} />
        </mesh>
        <group position={[100,100,0]}>
            <points geometry={PointBuffer}>
                <pointsMaterial color={0x00ff00} attach="material"/>
            </points>
        </group>
    </group>
}

export default Euclid;
