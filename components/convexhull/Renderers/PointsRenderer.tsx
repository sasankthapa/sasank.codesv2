import * as THREE from 'three';
import React, { useMemo } from 'react'
import { useLoader} from '@react-three/fiber';
import {PointsRendererProps} from '../../../types/convexhull/app.types';
import {TextureLoader } from 'three/src/loaders/TextureLoader'

const PointsRenderer:React.FC<PointsRendererProps>=({pointData,pointsData})=>{
    const texture=useLoader(TextureLoader,'assets/circlesprite.png')

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

    return <group position={[0,0,0.2]}>
        {pointsData?.map((point,index)=>{
            return <points key={'point'+index} geometry={pointsBuffers[index]}>
                <pointsMaterial size={point.size} transparent={true} map={texture} attach="material" color={point.color}/>
            </points>
        })}
        {pointData?.map((point,index)=>{
            return <points position={[0,0,0.1]} key={'points'+index} geometry={pointBuffers[index]}>
                <pointsMaterial size={point.size} transparent={true} map={texture} attach="material" color={point.color}/>
            </points>
        })}
    </group>
}

export default PointsRenderer;
