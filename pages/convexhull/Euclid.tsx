import {ThreeEvent} from '@react-three/fiber'
import React, { useRef, useState } from 'react'
import {EuclidProps} from '../../types/convexhull/app.types'
import PointsRenderer from './Renderers/PointsRenderer';
import LineRenderer from './Renderers/LineRenderer';
import CustomCamera from './Camera/CustomCamera';
import {  Vector2 } from 'three';

const Euclid:React.FC<EuclidProps>=({})=>{
    const plane=useRef(null);
    const [cameraPos,setCameraPos]=useState(new Vector2(0,0));
    const [cameraZoom,setCameraZoom]=useState(10);
    const [drag,setDrag]=useState(false);

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
        setDrag(true)
    }

    const dragEnd=(e:ThreeEvent<PointerEvent>)=>{
        e.stopPropagation();
        setDrag(false)
        setCameraPos(prev=>prev.set(e.camera.position.x,e.camera.position.y))
    }

    const dragMove=(e:ThreeEvent<PointerEvent>)=>{
        e.stopPropagation();
        if(drag && e.uv){
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
            {//linesData!==null?<LineRenderer linesData={linesData} />:null}
}
            {//pointData!==null && pointsData!==null?<PointsRenderer pointData={pointData} pointsData={pointsData}/>:null}
        }
        </group>
    </group>
    </>
}

export default Euclid;
