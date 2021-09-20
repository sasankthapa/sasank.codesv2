import * as THREE from 'three'
import {NextPage} from 'next';
import React,{ useEffect, useState} from 'react';
import { Canvas, extend } from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';
import Background from '../../components/Background';
import Island from './assets/Loader';

const App:React.FC<{}>=()=>{
        return <Canvas gl={{alpha:true}} style={{width:'100vw',height:'100vh'}}>
                <OrbitControls />
                <ambientLight intensity={0.8} />
                <mesh>
                    <boxGeometry args={[3,3,3]}/>
                    <meshNormalMaterial />
                </mesh>
                <Background/>
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
