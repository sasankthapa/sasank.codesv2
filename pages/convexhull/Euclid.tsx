import * as THREE from 'three';
import {extend,useStore,useThree} from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import {EuclidProps} from '../../types/convexhull/app.types'
import PointsRenderer from './PointsRenderer';
import LineRenderer from './LineRenderer';
import './ExtendControls'
import { OrbitControls } from '@react-three/drei';

const Euclid:React.FC<EuclidProps>=({points,hull})=>{
    const [dragging,setDragging]=useState(false);
    const [control,setControl]=useState(false);
    const plane=useRef(null);
    const {camera, gl: { domElement } } = useThree()

    useEffect(()=>{
        if(plane.current)
            setControl(true);
    },[plane.current])

    return <><group ref={plane} position={[-100,-100,0]}>
        <mesh onPointerDown={(e)=>setDragging(true)} onPointerMove={(e)=>{console.log(e.movementX)}} position={[100,100,0]}>
            <planeGeometry attach="geometry" args={[20,20,10,10]}/>
            <meshStandardMaterial />
        </mesh>
        <group position={[100,100,0.1]}>
            <LineRenderer lineData={[]} linesData={[{index:'hull',color:0xff0000,data:hull}]} />
            <PointsRenderer pointData={[]} pointsData={[{index:'points',color:0xff0000,data:points},{index:'hull',color:0x00ff00,data:hull}]}/>
        </group>
    </group>
    </>
}

export default Euclid;
