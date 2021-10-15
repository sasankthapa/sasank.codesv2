import * as THREE from 'three';
import React, {useRef,useEffect} from 'react';
import {MeshProps, ShaderMaterialProps, useFrame} from '@react-three/fiber';

const BackgroundShader:React.FC<ShaderMaterialProps> = (props) => {
    return <shaderMaterial 
            {...props}
            uniforms={{
                'vColor':{value:new THREE.Vector3(1.0,1.0,0.0)},
                'u_resolution':{value:new THREE.Vector2()},
                'u_time':{value:0.0},
                'u_mouse':{value:new THREE.Vector2()}
            }}
            vertexShader={`
                varying vec2 vUv;

                void main(){
                    vUv=uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
                }
                `}
            fragmentShader={
                `
                varying vec2 vUv;
                uniform vec3 vColor;
                uniform vec2 u_resolution;
                uniform vec2 u_mouse;
                uniform float u_time;

                void main(){
                    vec2 st=gl_FragCoord.xy/u_resolution;
                    gl_FragColor=vec4(vec3(1.0,1.0,st.y),st.x);
                }
                `
            }
        /> 
}

const Background:React.FC<MeshProps>=(props)=>{
    const ref=useRef<THREE.Mesh>(null);

    useFrame(({clock,mouse},delta)=>{
        if(ref.current){
            let material=ref.current.material as THREE.ShaderMaterial
            material.uniforms.u_time={value:clock.getElapsedTime()};
            let mouseX=(mouse.x+1.0)/2.0;
            let mouseY=(mouse.y+1.0)/2.0;
            console.log(mouseX,mouseY);
            material.uniforms.u_mouse={value:new THREE.Vector2(mouseX,mouseY)};
            material.needsUpdate=true;
        }
    })

    useEffect(()=>{
        if(ref.current){
            let material=ref.current.material as THREE.ShaderMaterial
            material.uniforms.u_resolution={value:new THREE.Vector2(window.innerWidth,window.innerHeight)};
        }
    },[])

    return <mesh ref={ref} {...props}>
        <planeGeometry attach="geometry" args={[10,10]} />
        <BackgroundShader attach="material"/>
    </mesh>
}

export default Background
