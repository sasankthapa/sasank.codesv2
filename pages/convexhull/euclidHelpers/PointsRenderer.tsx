import * as THREE from 'three';
import React from 'react'
import {PointsRendererProps} from '../../../types/convexhull/app.types';

const PointsRenderer:React.FC<PointsRendererProps>=({pointsList,pointsColor})=>{
    return <>{
        pointsList.map((points,index)=>{
            let pointsBuffer=new THREE.BufferGeometry().setFromPoints(points);
            return <points key={index+"points"} geometry={pointsBuffer}>
                <pointsMaterial color={pointsColor} attach="material"/>
            </points>
        })
    }</>
}

export default PointsRenderer;
