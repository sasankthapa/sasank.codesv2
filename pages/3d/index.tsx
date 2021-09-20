import * as THREE from 'three'
import {NextPage} from 'next';
import React,{ useEffect, useState} from 'react';
import { Canvas, extend } from '@react-three/fiber';
import {OrbitControls,shaderMaterial} from '@react-three/drei';
import {ShaderMaterial} from 'three';

const App:React.FC<{}>=()=>{
    const newShaderMaterial=shaderMaterial({
        vColor:new THREE.Vector3(1.0,1.0,0.0)
    },`
    void main(){
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
    `,
    `
        uniform vec3 vColor;

        void main(){
            gl_FragColor=vec4(vColor,0.8);
        }
    `)

        extend({newShaderMaterial})
        return <Canvas style={{width:'100vw',height:'100vh'}}>
                <OrbitControls />
                <ambientLight intensity={0.8} />
                <mesh>
                    <boxGeometry args={[3,3,3]}/>
                    <shaderMaterial 
                        uniforms={{
                            'vColor':{value:new THREE.Vector3(1.0,1.0,0.0)}
                        }}
                        vertexShader={`
                            varying vec2 vUv;

                            void main(){
                                vUv=position.xy;
                                gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
                            }
                            `}
                        fragmentShader={
                            `
                            varying vec2 vUv;
                            uniform vec3 vColor;
                            void main(){
                                
                                gl_FragColor=vec4(vColor,vUv.x);
                            }
                            `
                        }
                    /> 
                </mesh>
                <mesh>
                    <planeGeometry args={[100,100,3,3]}/>
                    <shaderMaterial 
                        uniforms={{
                            'vColor':{value:new THREE.Vector3(1.0,1.0,0.0)}
                        }}
                        vertexShader={`
                            varying vec2 vUv;

                            void main(){
                                vUv=position.xy;
                                gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
                            }
                            `}
                        fragmentShader={
                            `
                            varying vec2 vUv;
                            uniform vec3 vColor;
                            void main(){
                                
                                gl_FragColor=vec4(vColor,vUv.x);
                            }
                            `
                        }
                    /> 
                </mesh>
        </Canvas>
}

const Home:NextPage=()=>{
    const [clientSide,setClientSide]=useState(false);

    useEffect(()=>{
        console.log(process.browser)
        if(process.browser){
            console.log(process.browser)
            setClientSide(true)
        }
    },[])

    return <>{ clientSide? <App /> :null}</>
}

export default Home;
