import * as THREE from 'three';
import React, {useRef,useEffect} from 'react';
import {MeshProps, ShaderMaterialProps, useFrame, useThree} from '@react-three/fiber';

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

                float circle(in vec2 _st, in float _radius){
                    vec2 dist = _st-vec2(0.5,0.5);
                    return 1.-smoothstep(_radius-(_radius*2.034),
                                         _radius+(_radius*2.002),
                                         dot(dist,dist)*30.0);
                    }


                void main(){
                    vec2 st=gl_FragCoord.xy/u_resolution;
                    vec3 color = vec3(circle(st,abs(sin(u_time*0.332))+1.028));
                   //vec3(abs(sin(u_time*.2)),0,0.8) 
                    gl_FragColor=vec4(0.5,0.6,0.8,0.8);
                }
                `
            }
        /> 
}

const Background:React.FC<{z:number}>=({z})=>{
    const ref=useRef<THREE.Mesh>(null);
    const camera=useThree(state=>state.camera as THREE.PerspectiveCamera);

    const ang_rad=camera.fov * Math.PI / 180;
    const fov_y=(camera.position.z+z) * Math.tan(ang_rad/2)*2;

    useFrame(({clock,mouse},_)=>{
        if(ref.current){
            let material=ref.current.material as THREE.ShaderMaterial
            material.uniforms.u_time={value:clock.getElapsedTime()};
            let mouseX=(mouse.x+1.0)/2.0;
            let mouseY=(mouse.y+1.0)/2.0;
            material.uniforms.u_mouse={value:new THREE.Vector2(mouseX,mouseY)};
            material.needsUpdate=true;
        }
    })

    useEffect(()=>{
        if(ref.current){
            //update position
            let material=ref.current.material as THREE.ShaderMaterial
            material.uniforms.u_resolution={value:new THREE.Vector2(window.innerWidth,window.innerHeight)};
        }
    },[])

    return <mesh ref={ref} position={[0,0,-z]}>
        <planeGeometry attach="geometry" args={[fov_y*camera.aspect,fov_y,10,10]}/>
        <BackgroundShader attach="material"/>
    </mesh>
}

export default Background
