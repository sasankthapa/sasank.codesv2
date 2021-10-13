import * as THREE from 'three';
import React, { useMemo } from 'react'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';
import { useLoader} from '@react-three/fiber';
import {PointsRendererProps} from '../../../types/convexhull/app.types';

const PointsRenderer:React.FC<PointsRendererProps>=({pointData,pointsData})=>{
    const texture=useLoader(TextureLoader,'assets/circlesprite.png');

    const pointBuffers=useMemo(()=>{
        return pointData.map((point)=>{
            return new THREE.BufferGeometry().setFromPoints(point.data?[point.data]:[])
        })
    },[pointData])

    const pointsBuffers=useMemo(()=>{
        return pointsData.map((point)=>{
            return new THREE.BufferGeometry().setFromPoints(point.data||[])
        })
    },[pointsData])

    return <group>
        {pointsData?.map((point,index)=>{
            return <points key={'point'+index} geometry={pointsBuffers[index]}>
                <pointsMaterial transparent={true} opacity={1} attach="material" map={texture} color={point.color}/>
            </points>
        })}
        {pointData?.map((point,index)=>{
            return <points key={'points'+index} geometry={pointBuffers[index]}>
                <pointsMaterial attach="material" map={texture} color={point.color}/>
            </points>
        })}
    </group>
}

export default PointsRenderer;
