import * as THREE from 'three';
import React from 'react'
import {LineRendererProps} from '../../../types/convexhull/app.types';

const LineRenderer:React.FC<LineRendererProps>=({lineList,lineColor})=>{
    return <>{
        lineList.map((points,index)=>{
            let pointsBuffer=new THREE.BufferGeometry().setFromPoints(points);
            return <lineSegments key={index+"points"} geometry={pointsBuffer}>
                <lineBasicMaterial color={lineColor} linewidth={1} attach="material"/>
            </lineSegments>
        })
    }</>
}

export default LineRenderer;
