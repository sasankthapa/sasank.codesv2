import * as THREE from 'three';
import {useFrame, useLoader, useThree} from '@react-three/fiber'
import React, {useMemo, useRef, useState} from 'react'
import {EuclidProps} from '../../types/convexhull/app.types'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';
import PointsRenderer from './PointsRenderer';

const Plane:React.FC<{}>=()=>{
    return <mesh>
            <planeGeometry attach="geometry" args={[10,10]}/>
            <meshStandardMaterial color={0xffffff} />
        </mesh>
}

const Euclid:React.FC<EuclidProps>=({points,hull})=>{
    return <group position={[-100,-100,0]}>
        <mesh onPointerMove={(e)=>{console.log(e.movementX)}} position={[100,100,0]}>
            <planeGeometry attach="geometry" args={[10,10,10,10]}/>
            <meshStandardMaterial wireframe={true} />
        </mesh>
        <group position={[100,100,0]}>
            <PointsRenderer pointData={[]} pointsData={[{index:'points',color:0xf0ff0f,data:points},{index:'hull',color:0xff0000,data:hull}]}/>
        </group>
    </group>
}

export default Euclid;
