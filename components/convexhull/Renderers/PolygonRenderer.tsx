import * as THREE from 'three';
import React, {useMemo} from 'react'
import { PolygonRendererProps} from '../../../types/convexhull/app.types';

const PolygonRenderer:React.FC<PolygonRendererProps>=({polyData})=>{
    const polyBuffers=useMemo(()=>{
        return polyData.map((curr)=>{
            return new THREE.BufferGeometry().setFromPoints(curr.data);
        })
    },[polyData])

    return <group>
        {polyData.map((poly,index)=>{
                return <mesh geometry={polyBuffers[index]}>
                    <meshBasicMaterial color={poly.color} />
                </mesh>
    })}
    </group>
}

export default PolygonRenderer;

