import * as THREE from 'three';
import {extend,ThreeEvent,useFrame,useStore,useThree} from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import {EuclidProps} from '../../types/convexhull/app.types'
import PointsRenderer from './Renderers/PointsRenderer';
import LineRenderer from './Renderers/LineRenderer';
import CustomCamera from './CustomCamera';
import { Camera, Vector2, Vector3 } from 'three';

const Euclid:React.FC<EuclidProps>=({points,hull})=>{
    const plane=useRef(null);
    const [cameraPos,setCameraPos]=useState(new Vector2(0,0));
    const [cameraZoom,setCameraZoom]=useState(10);
    const [drag,setDrag]=useState(false);
    const [mouse,setMouse]=useState(new Vector2(0,0))

    const handleWheel=(e:ThreeEvent<WheelEvent>)=>{
        e.stopPropagation();
        console.log(e.deltaY)
        if(e.deltaY >0)
            setCameraZoom(prev=>prev <200?prev+10:prev)
        if(e.deltaY <0)
            setCameraZoom(prev=>prev>10?prev-10:prev)
    }

    const dragStart=(e:ThreeEvent<PointerEvent>)=>{
        e.stopPropagation();
        setMouse(new Vector2(e.spaceX,e.spaceY))
        setDrag(true)
    }

    const dragEnd=(e:ThreeEvent<PointerEvent>)=>{
        e.stopPropagation();
        setDrag(false)
        setCameraPos(prev=>prev.set(e.camera.position.x,e.camera.position.y))
    }

    const dragMove=(e:ThreeEvent<PointerEvent>)=>{
        e.stopPropagation();
        console.log(e.uv)
        if(drag && e.uv){
            const mouseCoords=new Vector2(e.spaceX,e.spaceY)
            const direction=mouseCoords.sub(mouse).normalize().multiplyScalar(5);
            setCameraPos(e.uv.clone().subScalar(0.5).multiplyScalar(5))
        }
    }

    return <>
        <CustomCamera targetPosition={cameraPos} zoom={cameraZoom}/>
        <group position={[-100,-100,0]}>
        <mesh ref={plane} onWheel={handleWheel} onPointerMove={dragMove} onPointerDown={dragStart} onPointerUp={dragEnd} position={[100,100,0]}>
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
