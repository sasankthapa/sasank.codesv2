import * as THREE from 'three';
import React from "react";
import {State,Props} from '../../types/convexhull/app.types'
import AlgorithmDisplay from "./AlgorithmDisplay";
import CustomCanvas from "./CustomCanvas";
import {genRandomPoints} from './functions/Utils';

export default class App extends React.Component<Props,State>{
    constructor(props:Props){
        super(props);
        this.state={
            stackArr:[],
            points:[],
            hull:[],
            clientSide:false,
            width:0,
            height:0,
        }
    }

    createPoints=(n:number)=>{
        const list=genRandomPoints(n,5);
        this.setState({points:list});
    }

    componentDidMount(){
        this.createPoints(10)
        this.setState({
                
        })
        window.addEventListener('resize', ()=>{
        })
    }

    render(){
        return <div className="flex flex-col w-screen h-screen md:flex-row">
            <CustomCanvas points={this.state.points}/>
            <AlgorithmDisplay/>
        </div>
    }
}
