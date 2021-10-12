import React from "react";
import {State,Props} from '../../types/convexhull/app.types'
import AlgorithmDisplay from "./AlgorithmDisplay";
import dynamic from 'next/dynamic'
import {genRandomPoints} from './functions/Utils';
import {GrahamScan} from './functions/GrahamScan';

const DynamicCanvas=dynamic(
    ()=>import('./CustomCanvas'),
    {ssr:false}
)

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
            <DynamicCanvas points={this.state.grahamScan.points}/>
            <AlgorithmDisplay step={this.step.bind(this)}/>
        </div>
    }
}
