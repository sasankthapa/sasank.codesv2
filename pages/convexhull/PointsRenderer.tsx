import * as THREE from 'three';
import React, { useState } from 'react'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';
import {useLoader} from '@react-three/fiber';

type point={index:string,data:THREE.Vector2,color:number};
type points={index:string,data:Array<THREE.Vector2>,color:number};

interface PointsRendererProps{
    pointData:Array<point>,
    pointsData:Array<points>
}

const Point:React.FC<{point:point}>=({point})=>{
}

const PointsRenderer:React.FC<PointsRendererProps>=({pointData,pointsData})=>{
    const texture=useLoader(TextureLoader,'assets/circlesprite.png');

    return <group>
        {pointsData?.map((point)=>{
            const PointBuffer=(new THREE.BufferGeometry()).setFromPoints(point.data);
            return <points key={point.index} geometry={PointBuffer}>
                <pointsMaterial map={texture} color={point.color}/>
            </points>
        })}
    </group>
}

export default PointsRenderer;
