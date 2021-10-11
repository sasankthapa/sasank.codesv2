import * as THREE from 'three';
import {useFrame, useLoader, useThree} from '@react-three/fiber'
import React, {useEffect, useRef, useState} from 'react'
import {EuclidProps} from '../../types/convexhull/app.types'
import {Vector3} from 'three';

const Plane:React.FC<{}>=()=>{
    return <mesh>
            <planeGeometry attach="geometry" args={[10,10]}/>
            <meshStandardMaterial color={0xffffff} />
        </mesh>
}

const Euclid:React.FC<EuclidProps>=({points})=>{
    const [dragging,setDragging]=useState(false);
    const [dragStart,setDragStart]=useState(new THREE.Vector2());
    const [planeCurr,setPlaneCurr]=useState(new THREE.Vector3());
    const [planeTarget,setPlaneTarget]=useState(new THREE.Vector3());
    const baseE=useRef<THREE.Group>();

    const handleDrag=()=>{
        console.log('her');
    }

    const PointBuffer=(new THREE.BufferGeometry()).setFromPoints(points)

    const moveTowards=(curr:THREE.Vector3,target:THREE.Vector3)=>{
        return target.sub(curr).divide(new THREE.Vector3(3,3,3))
    }

    useFrame((state)=>{
        if(dragging){
            console.log(state.mouse.x,state.mouse.y);
            if(baseE.current?.position!==planeTarget){
            }
        }
    })

    return <group ref={baseE} >
        <group position={[-100,-100,0]}>
            <mesh position={[100,100,0]}
                onWheel={(e)=>{
                    e.stopPropagation()
                }}
                onPointerDown={(e)=>{
                    e.stopPropagation()
                    setPlaneTarget(e.intersections[0].point)
                    return setDragging(true);
                }}
                onPointerMove={(e)=>{
                    e.stopPropagation();
                    setPlaneTarget(e.intersections[0].point)
                }}
                onPointerUp={()=>setDragging(false)}
                >
                <planeGeometry attach="geometry" args={[10,10,10,10]}/>
                <meshStandardMaterial wireframe={true} />
            </mesh>
            <group position={[100,100,0]}>
                <points geometry={PointBuffer}>
                    <pointsMaterial color={0x00ff00} attach="material"/>
                </points>
            </group>
        </group>
    </group>
}

export default Euclid;
