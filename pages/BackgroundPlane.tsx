import * as THREE from 'three';
import { useThree } from '@react-three/fiber'
import React from 'react'

const BackgroundPlane:React.FC<{}>=({})=>{
    const camera=useThree(state=>state.camera as THREE.PerspectiveCamera);

    const ang_rad=camera.fov * Math.PI / 180;
    const fov_y=camera.position.z * Math.tan(ang_rad/2)*2;

    return <mesh>
        <planeGeometry args={[fov_y*camera.aspect,fov_y,10,10]}/>
        <meshNormalMaterial />
    </mesh>
}

export default BackgroundPlane
