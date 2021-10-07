import * as THREE from 'three';
import React from "react";
import {State,Props} from '../../types/convexhull/app.types'
import AlgorithmDisplay from "./AlgorithmDisplay";
import CustomCanvas from "./CustomCanvas";

export default class App extends React.Component<Props,State>{
    constructor(props:Props){
        super(props);
        this.state={
            stackArr:[],
            points:[new THREE.Vector3(0,0,0)],
            hull:[],
            clientSide:false
        }
    }

    genRandomPoints=(n:number)=>{
    }

    componentDidMount(){

    }

    render(){
        return <div className="flex flex-col w-screen h-screen md:flex-row">
            <CustomCanvas points={this.state.points}/>
            <AlgorithmDisplay/>
        </div>
    }
}
