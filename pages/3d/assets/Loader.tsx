import React, {useRef,Suspense} from 'react';
import {MeshProps, useLoader} from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const Island:React.FC<MeshProps>=(props)=>{
    const model=useLoader(GLTFLoader,'../../../assets/IslandMesh.glb')
    return (
        <Suspense fallback={null}>
            <mesh {...props}>
                <primitive object={model.scene}/>
            </mesh>
        </Suspense>
    )
}

export default Island;
