import * as THREE from 'three';
import React from "react";
import {State,Props} from '../../types/convexhull/app.types'
import AlgorithmDisplay from "./AlgorithmDisplay";
import CustomCanvas from "./CustomCanvas";
import {genRandomPoints} from './functions/Utils';
import {GrahamScan} from './functions/GrahamScan';

export default class App extends React.Component<Props,State>{
    constructor(props:Props){
        super(props);
        this.state={
            step:false,
            needsUpdate:false,
            grahamScan:new GrahamScan(),
            clientSide:false,
            width:0,
            height:0,
        }
    }

    createPoints=(n:number)=>{
        const list=genRandomPoints(n,5);
        this.setState((prev)=>{
            const newState={...prev};
            newState.grahamScan.points=list;
            return newState
        })
    }

    componentDidMount(){
        this.createPoints(10)
        window.addEventListener('resize', ()=>{
        })
    }

    step(){
        this.setState({step:true})
    }

    render(){
        return <div className="flex flex-col w-screen h-screen md:flex-row">
            <CustomCanvas points={this.state.grahamScan.points}/>
            <AlgorithmDisplay step={this.step.bind(this)}/>
        </div>
    }
}
